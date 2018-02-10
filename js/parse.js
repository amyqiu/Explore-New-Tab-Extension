function parsePost(element) {
  var post = new Object();
  post.title = element.getElementsByTagName("title")[0].childNodes[0].nodeValue;
  post.categories = [];
  var categories = element.getElementsByTagName("category");
  for (var i = 0; i < categories.length; i++) {
    post.categories.push(categories[i].childNodes[0].nodeValue);
  }
  post.tag = post.categories.join(", ");
  post.id = element.getElementsByTagName("guid")[0].childNodes[0].nodeValue;
  post.url = element.getElementsByTagName("link")[0].childNodes[0].nodeValue;
  post.description = element.getElementsByTagName("description")[0].childNodes[0].nodeValue;
  var date = element.getElementsByTagName("dc:date")[0];
  if (date != null){
    post.date = new Date(date.textContent);
  } else{
    post.date = new Date(0);
  }

  return post;
}

function getJSON(url, callback) {
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
