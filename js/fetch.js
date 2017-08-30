var url;
var title;

//Calls background page to retrieve RSS feed
function fetch_feed() {
  console.log("sending");
  chrome.runtime.sendMessage("onoindacglppmommbbakiflnaemdoemg", {action : 'fetch_feed', url : 'http://www.rssmix.com/u/8250248/rss.xml'},
    function(response) {
      display_stories(response);
    }
  );
}

//Randomly picks an article to display
function display_stories(feed_data) {
  var xml_doc = $.parseXML(feed_data);
  $xml = $(xml_doc);
  var items = $xml.find("item");
  var element = items[Math.floor(Math.random() * items.length)];

    var post = parse_post(element);
    var item = '';
    item += '<div class="post">';
    item += '<a href="' + post.url + '">\
              <span>' + post.title + '...</span>\
            </div>\
          </a>';
    item += '</div>';
    $('#popup').append(item);
    // TODO why isn't jQuery's .on defined?
    var $item = $('div[id="' + post.id + '"]')
    console.log('$item', $item)

    url = post.url;
    title = post.title;
}

$(document).ready(function() {
  //Button for bookmarking articles
  var bookmarkButton = document.querySelector('.bookmark');
  bookmarkButton.addEventListener('click', function() {
		chrome.bookmarks.create({'title': title,
                               'url': url});
    bookmarkButton.classList.add("disabled");
    bookmarkButton.innerHTML = "Bookmarked!";
  });

  //Getting articles from RSS feed
  fetch_feed();
});
