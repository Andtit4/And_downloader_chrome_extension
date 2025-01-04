/* // utils/video-utils.js
function getVideoUrls() {
    const videoUrls = [];
    document.querySelectorAll("video").forEach(video => {
      if (video.src && !videoUrls.includes(video.src)) {
        videoUrls.push(video.src);
      }
      video.querySelectorAll("source").forEach(source => {
        if (source.src && !videoUrls.includes(source.src)) {
          videoUrls.push(source.src);
        }
      });
    });
    return videoUrls.length > 0 ? videoUrls : null;
  }
  
  export default getVideoUrls/*  */ 