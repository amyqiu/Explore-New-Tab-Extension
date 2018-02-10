function onRequest(request, sender, callback) {
  if (request.action == "fetch_feed") {
        getJSON(request.url, callback);
      }
  return true;
}

// Wire up the listener.
chrome.runtime.onMessage.addListener(onRequest);
