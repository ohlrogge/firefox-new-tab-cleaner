const DEFAULT = 5;

async function restore() {
  const result = await browser.storage.sync.get({ timeoutMinutes: DEFAULT });
  document.getElementById("timeout").value = result.timeoutMinutes;
}

document.getElementById("save").addEventListener("click", async () => {
  const val = Number.parseInt(document.getElementById("timeout").value, 10);
  if (Number.isNaN(val) || val < 1) return;
  await browser.storage.sync.set({ timeoutMinutes: val });
  const status = document.getElementById("status");
  status.textContent = "Saved.";
  setTimeout(() => { status.textContent = ""; }, 1500);
});

restore();
