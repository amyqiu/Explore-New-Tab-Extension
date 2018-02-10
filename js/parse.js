function parse_post(element) {
  var $element = $(element);
	var post = new Object();
	post.title = $element.find("title").text();
	post.categories = [];
	var categories = $element.find("category");
  for (var i = 0; i < categories.length; i++){
    post.categories.push(categories[i].innerHTML);
  }
  post.tag = post.categories.join(", ");
	post.id = $(element).find("guid").text();
	post.url = $(element).find('link').text();
	post.description = $("<div/>").html($(element).find("description")).text();
	var date = $(element).find("dc\\:date").text();
	post.date = new Date(date);
	return post;
}

function open_item(url) {
	chrome.tabs.create({url: url});
	chrome.browserAction.setBadgeText({text:""});
}

function fetch_feed(url, callback) {
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
