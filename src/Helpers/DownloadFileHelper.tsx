//@ts-ignore
window.downloadFile = function (sUrl: string, filename: string) {
  // If in Chrome or Safari - download via virtual link click
  if (
    //@ts-ignore
    window.downloadFile.isChrome ||
    //@ts-ignore
    window.downloadFile.isSafari ||
    //@ts-ignore
    window.downloadFile.isFirefox
  ) {
    // Creating new link node.
    // noinspection ES6ConvertVarToLetConst
    var link = document.createElement("a");
    link.href = sUrl;

    if (link.download !== undefined && !filename) {
      // Set HTML5 download attribute. This will prevent file from opening if supported.
      filename = sUrl.substring(sUrl.lastIndexOf("/") + 1, sUrl.length);
    }

    link.download = filename;

    // Dispatching click event.
    try {
      if (document.createEvent) {
        // noinspection ES6ConvertVarToLetConst
        var e = document.createEvent("MouseEvents");
        e.initEvent("click", true, true);
        link.dispatchEvent(e);
        //Pace.stop();
        return true;
      }
    } catch (e) {}
  }
};
//@ts-ignore
window.downloadFile.isChrome =
  navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
//@ts-ignore
window.downloadFile.isFirefox =
  navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
//@ts-ignore
window.downloadFile.isSafari =
  navigator.userAgent.toLowerCase().indexOf("safari") > -1;

export {};
