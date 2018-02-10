function show_post(post) {
  var item = "";
  item += "<div class='post'>";
  item += "<a id='link' href='" + post.url + "'>\
            <span id='title'>" + post.title + "...</span>\
          </div>\
        </a>";
  item += "</div>";
  $("#popup").append(item);
}

function store_posts(newPosts, existingPosts) {
  newPosts.push.apply(newPosts, existingPosts);

  chrome.storage.local.set({
    "posts": newPosts
  });
  chrome.storage.sync.set({
    "lastDate": new Date().toString()
  });
}

function use_existing_post(existingPosts) {
  console.log("Retrieved previous posts: ", existingPosts.posts);

  show_post(existingPosts.posts[0]);
  existingPosts.posts.splice(0, 1);
  store_posts([], existingPosts.posts);
}

function check_topics(doc, selectedOptions, location) {
  var topicFound = false;
  selectedOptions.forEach(function(option) {
    if (doc.match("#" + option).found){
      topicFound = true;
    }
  });

  var otherLocation = false;
  if (!doc.match("#" + location).found) {
    otherLocation = true;
  }

  return topicFound && otherLocation;
}

function filter_latest_posts(items, lastDate, selectedOptions, location) {
  var newPosts = [];
  var nlp = require("compromise");
  var lexicon = require("../lexicon.json");

  $.each(items, function(index, value) {
    var item = value;
    var post = parse_post(item);
    var prevDate = new Date(lastDate);
    if (post.date > prevDate) {
      var doc = nlp(post.description + " " + post.title + " " + post.tag, lexicon);
      if (check_topics(doc, selectedOptions, location)) {
        post.topics = doc.topics().out("array");
        newPosts.push(post);
      }
    }
  });
  if (newPosts.length > 0) {
    var currentPost = newPosts[0];
    show_post(currentPost);
    newPosts.splice(0, 1);
    chrome.storage.local.get("posts", function(existingPosts) {
      store_posts(newPosts, existingPosts);
    });
  } else {
    chrome.storage.local.get("posts", use_existing_post);
  }
}

//Randomly picks an article to display
function display_post(feed_data) {
  var xml_doc = $.parseXML(feed_data);
  $xml = $(xml_doc);
  var items = $xml.find("item");

  chrome.storage.sync.get({
    lastDate: 0,
    selectedOptions: ["Business", "Politics"],
    location: "North America"
  }, function(options) {
    filter_latest_posts(items, options.lastDate, options.selectedOptions, options.location);
  });
}

//Calls background page to retrieve RSS feed
function fetch_feed() {
  chrome.runtime.sendMessage("onoindacglppmommbbakiflnaemdoemg", {
      action: "fetch_feed",
      url: 'http://www.rssmix.com/u/8269737/rss.xml'
    },
    function(response) {
      display_post(response);
    }
  );
}

$(document).ready(function() {
  //Button for bookmarking articles
  var bookmarkButton = document.querySelector("#bookmark");
  bookmarkButton.addEventListener("click", function() {
    var title = document.querySelector("#title").innerHTML;
    var url = document.querySelector("#link").getAttribute("href");
    chrome.bookmarks.create({
      "title": title,
      "url": url
    });
    bookmarkButton.classList.add("disabled");
    bookmarkButton.innerHTML = "Bookmarked!";
  });

  //Getting articles from RSS feed
  fetch_feed();
});
