const apiUrl = "https://tab-sync-worker.ryanzhou147.workers.dev";

document.getElementById("sync").addEventListener("click", async () => {
  const tabs = await chrome.tabs.query({});
  for (const tab of tabs) {
    await fetch(`${apiUrl}/sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: tab.id,
        url: tab.url,
        scroll: 0,
        timestamp: 0,
        windowId: tab.windowId
      }),
    });
  }
});

document.getElementById("load").addEventListener("click", async () => {
  const response = await fetch(`${apiUrl}/load`);
  const data = await response.json();
  for (const tab of data) {
    chrome.windows.create({ url: tab.url });
  }
});

document.getElementById("view").addEventListener("click", async () => {
  const response = await fetch(`${apiUrl}/load`);
  const data = await response.json();
  alert(JSON.stringify(data, null, 2));
});
