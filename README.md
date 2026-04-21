# New Tab Cleaner

**Automatically closes stale new tabs so your tab bar stays clean.**

---

## What it does

New Tab Cleaner keeps your browser tidy by managing empty new tabs in two ways:

**1. Close duplicates immediately**
Whenever you open a new tab, any other idle new tabs (`about:newtab` / `about:blank`) are closed automatically. Only the one you just opened survives.

**2. Close tabs left idle too long**
If a new tab sits untouched for longer than your configured timeout, it gets closed automatically. The default is 5 minutes.

---

## Settings

Open the extension preferences to configure the idle timeout (1–60 minutes).

---

## Permissions

| Permission | Why it's needed |
|---|---|
| `tabs` | Read tab URLs and close stale new tabs |
| `storage` | Save your timeout preference |
| `alarms` | Run a periodic check to close idle tabs |

No data leaves your browser. Nothing is tracked or transmitted.

---

## Installation

Install from the [Firefox Add-ons marketplace](https://addons.mozilla.org/) or load it temporarily via `about:debugging` → *Load Temporary Add-on* → select `manifest.json`.

**Source:** https://github.com/ohlrogge/firefox-new-tab-cleaner

---

## AMO listing copy

> Copy the blocks below when submitting to addons.mozilla.org.

**Summary** *(max 250 characters)*
```
Automatically closes stale new tabs. Closes duplicate new tabs the moment you open one, and closes any new tab left idle longer than a configurable timeout (default: 5 minutes).
```

**Description**
```
New Tab Cleaner keeps your tab bar tidy by automatically removing empty new tabs you forgot about.

HOW IT WORKS

• Duplicate cleanup — the moment you open a new tab, every other open new tab (about:newtab / about:blank) is closed immediately.

• Idle timeout — any new tab left untouched for longer than your configured timeout is closed automatically. The default is 5 minutes; you can set anything from 1 to 60 minutes in the extension settings.

PERMISSIONS

tabs — needed to read tab URLs and close stale tabs.
storage — needed to save your timeout preference.
alarms — needed to run a periodic idle check every 30 seconds.

PRIVACY

No data leaves your browser. The extension collects nothing and makes no network requests.
```
