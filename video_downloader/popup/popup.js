// popup/popup.js
document.getElementById("download-videos").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["content/content.js"]
      }, () => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "getVideos" }, (response) => {
          const videoList = document.getElementById("video-list");
          videoList.innerHTML = "";
          if (response && response.length > 0) {
            response.forEach((videoUrl, index) => {
              const listItem = document.createElement("li");
              listItem.textContent = `Video ${index + 1}`;
              const downloadButton = document.createElement("button");
              downloadButton.textContent = "Download";
              downloadButton.addEventListener("click", () => {
                chrome.downloads.download({ url: videoUrl, filename: `video_${index + 1}.mp4` });
              });
              listItem.appendChild(downloadButton);
              videoList.appendChild(listItem);
            });
          } else {
            videoList.textContent = "No videos found.";
          }
        });
      });
    });
  });
  