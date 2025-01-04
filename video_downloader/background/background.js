// background/background.js
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content/content.js"]
  }, () => {
    chrome.tabs.sendMessage(tab.id, { action: "getVideos" }, (response) => {
      if (response && response.length > 0) {
        response.forEach((videoUrl, index) => {
          chrome.downloads.download({
            url: videoUrl,
            filename: `video_${index + 1}.mp4`
          });
        });
      } else {
        console.log("No videos found on this page.");
      }
    });
  });
});
