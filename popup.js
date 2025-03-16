document.getElementById('syncButton').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'syncTabs' }, (response) => {
      alert(response.status);
  });
});

document.getElementById('restoreButton').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'restoreTabs' }, (response) => {
      alert(response.status);
  });
});

document.getElementById('viewTabsButton').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'viewTabs' }, (data) => {
      const container = document.getElementById('tabList');
      container.innerHTML = '';

      if (!data.savedWindows || data.savedWindows.length === 0) {
          container.innerHTML = '<p>No synced tabs found.</p>';
          return;
      }

      data.savedWindows.forEach((windowData, winIndex) => {
          const windowHeader = document.createElement('h3');
          windowHeader.textContent = `Window ${winIndex + 1}`;
          container.appendChild(windowHeader);

          windowData.tabs.forEach(tab => {
              const tabItem = document.createElement('div');
              tabItem.innerHTML = `
                  <p><strong>${tab.title}</strong> - <a href="${tab.url}" target="_blank">${tab.url}</a></p>
                  <button class="open-tab" data-url="${tab.url}">Open</button>
              `;
              container.appendChild(tabItem);
          });
      });

      document.querySelectorAll('.open-tab').forEach(button => {
          button.addEventListener('click', (event) => {
              const url = event.target.getAttribute('data-url');
              chrome.tabs.create({ url });
          });
      });
  });
});
