const NEW_TAB_URLS = new Set(["about:newtab", "about:blank"]);
const DEFAULT_TIMEOUT_MINUTES = 5;
const ALARM_NAME = "newtab-idle-check";

// tabId → timestamp of last activation
const lastActive = new Map();

function isNewTab(url) {
  return NEW_TAB_URLS.has(url);
}

async function getTimeoutMs() {
  const result = await browser.storage.sync.get({ timeoutMinutes: DEFAULT_TIMEOUT_MINUTES });
  return result.timeoutMinutes * 60 * 1000;
}

// Close all OTHER existing new tabs when a new one opens
async function closeOtherNewTabs(sourceTabId) {
  const all = await browser.tabs.query({});
  const toClose = all
    .filter(t => t.id !== sourceTabId && isNewTab(t.url || ""))
    .map(t => t.id);
  if (toClose.length > 0) {
    await browser.tabs.remove(toClose);
    toClose.forEach(id => lastActive.delete(id));
  }
}

// Track when a tab is activated (focused)
browser.tabs.onActivated.addListener(({ tabId }) => {
  lastActive.set(tabId, Date.now());
});

// When a new tab is created, record it and close other new tabs
browser.tabs.onCreated.addListener(async (tab) => {
  if (isNewTab(tab.url || "about:newtab")) {
    lastActive.set(tab.id, Date.now());
    await closeOtherNewTabs(tab.id);
  }
});

// Catch tabs that update to a new-tab URL after creation
browser.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (changeInfo.url && isNewTab(changeInfo.url)) {
    if (!lastActive.has(tabId)) {
      lastActive.set(tabId, Date.now());
    }
    await closeOtherNewTabs(tabId);
  }
  // If the tab navigated AWAY from a new-tab URL, stop tracking it
  if (changeInfo.url && !isNewTab(changeInfo.url)) {
    lastActive.delete(tabId);
  }
});

// Clean up tracking when a tab is closed
browser.tabs.onRemoved.addListener((tabId) => {
  lastActive.delete(tabId);
});

// Periodic check: close new tabs idle longer than the configured timeout
browser.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== ALARM_NAME) return;
  const timeoutMs = await getTimeoutMs();
  const now = Date.now();
  const all = await browser.tabs.query({});
  const toClose = all
    .filter(t => isNewTab(t.url || ""))
    .filter(t => {
      const last = lastActive.get(t.id) ?? 0;
      return (now - last) >= timeoutMs;
    })
    .map(t => t.id);
  if (toClose.length > 0) {
    await browser.tabs.remove(toClose);
    toClose.forEach(id => lastActive.delete(id));
  }
});

// Start the alarm (fires every 30 seconds)
browser.alarms.create(ALARM_NAME, { periodInMinutes: 0.5 });
