function getData(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(data) {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var data = xhr.responseText;
        callback(data);
      } else {
        console.log("Response was not 200", xhr.status)
        callback(null);
      }
    }
  }
  xhr.open("GET", url, true);
  xhr.send();
}

function parseXML(xmlStr) {
   return new window.DOMParser().parseFromString(xmlStr, "text/xml");
}
