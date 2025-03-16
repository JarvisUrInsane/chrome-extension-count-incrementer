chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "syncTabs") {
      chrome.windows.getAll({ populate: true }, (windows) => {
          const savedWindows = windows.map(win => ({
              tabs: win.tabs.map(tab => ({
                  title: tab.title,
                  url: tab.url
              }))
          }));

          chrome.storage.local.set({ savedWindows }, () => {
              console.log("Tabs synchronized.");
              sendResponse({ status: "Tabs saved successfully!" });
          });
      });
      return true;
  }

  if (message.action === "restoreTabs") {
      chrome.storage.local.get("savedWindows", (data) => {
          if (!data.savedWindows) return;

          data.savedWindows.forEach((windowData) => {
              chrome.windows.create({}, (newWin) => {
                  windowData.tabs.forEach((tab, index) => {
                      chrome.tabs.create({ windowId: newWin.id, url: tab.url, index });
                  });
              });
          });

          sendResponse({ status: "Tabs restored successfully!" });
      });
      return true;
  }

  if (message.action === "viewTabs") {
      chrome.storage.local.get("savedWindows", (data) => {
          sendResponse({ savedWindows: data.savedWindows || [] });
      });
      return true;
  }
});
