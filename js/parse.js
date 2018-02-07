function parse_post(element) {
  var $element = $(element)
	var post = new Object();
	post.title = $element.find("title").text();
	post.categories = []
	var categories = $element.find("category")
  for (var i = 0; i < categories.length; i++)
    post.categories.push(categories[i].innerHTML)
  post.tag = post.categories.join(', ')
	post.id = $(element).find("guid").text();
	post.url = $(element).find('link').text();
	post.description = $("<div/>").html($(element).find("description")).text();
	var date = $(element).find("dc\\:date").text();
	post.date = new Date(date);
	//var shorten = 120;
	//if (post.title.length > 80) {
	//	shorten = 70;
	//}
	//post.description = $.trim($(post.description).text());
	//post.description = post.description.substr(0, shorten);
	return post;
}

function open_item(url) {
	chrome.tabs.create({url: url});
	chrome.browserAction.setBadgeText({text:''});
}
