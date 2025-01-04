function getVideoUrls() {
  const videoUrls = [];
  document.querySelectorAll("video").forEach(video => {
    if (video.src) {
      videoUrls.push(video.src);
    }
    video.querySelectorAll("source").forEach(source => {
      if (source.src && !videoUrls.includes(source.src)) {
        videoUrls.push(source.src);
      }
    });
  });
  return videoUrls;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getVideos") {
    const videos = getVideoUrls();
    sendResponse(videos);
  }
});
