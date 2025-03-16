(function () {
    let scrollPosition = window.scrollY;
    let videoTimestamp = document.querySelector('video') ? document.querySelector('video').currentTime : null;
  
    // Store scroll and video info in chrome storage for current tab
    chrome.storage.sync.set({ currentTab: { scrollPosition, videoTimestamp } });
  })();
  