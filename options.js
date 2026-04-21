const DEFAULT = 5;

async function restore() {
  const result = await browser.storage.sync.get({ timeoutMinutes: DEFAULT });
  document.getElementById("timeout").value = result.timeoutMinutes;
}

function showStatus(message, type) {
  const status = document.getElementById("status");
  status.textContent = message;
  status.className = `visible ${type}`;
  setTimeout(() => {
    status.className = "";
  }, 2500);
}

document.getElementById("save").addEventListener("click", async () => {
  const input = document.getElementById("timeout");
  const val = Number.parseInt(input.value, 10);

  if (Number.isNaN(val) || val < 1 || val > 60) {
    showStatus("Enter a value between 1 and 60.", "error");
    input.focus();
    return;
  }

  await browser.storage.sync.set({ timeoutMinutes: val });
  showStatus("Settings saved.", "saved");
});

// Allow saving with Enter key
document.getElementById("timeout").addEventListener("keydown", (e) => {
  if (e.key === "Enter") document.getElementById("save").click();
});

restore();
