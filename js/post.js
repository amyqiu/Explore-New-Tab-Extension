//Adds html to display post
function showPost(post) {
  var item = "";
  item += "<div class='post'>";
  item += "<a id='link' href='" + post.url + "'>\
            <span id='title'>" + post.title + "...</span>\
          </div>\
        </a>";
  item += "</div>";
  var article = document.querySelector("#article");
  article.innerHTML = item;
}

//Updates storage with new posts
function storePosts(newPosts, existingPosts) {
  newPosts.push.apply(newPosts, existingPosts);

  chrome.storage.local.set({
    "posts": newPosts
  });
  chrome.storage.sync.set({
    "lastDate": new Date().toString()
  });
}

//Removes post from saved posts to display
function useExistingPost(options) {
  console.log("Retrieved previous posts: ", options.posts);

  showPost(options.posts[0]);
  options.posts.splice(0, 1);
  storePosts([], options.posts);
}

//Converts xml to post object
function parsePost(item) {
  var post = new Object();
  post.title = item.getElementsByTagName("title")[0].childNodes[0].nodeValue;
  post.categories = [];
  var categories = item.getElementsByTagName("category");
  for (var i = 0; i < categories.length; i++) {
    post.categories.push(categories[i].childNodes[0].nodeValue);
  }
  post.tag = post.categories.join(", ");
  post.id = item.getElementsByTagName("guid")[0].childNodes[0].nodeValue;
  post.url = item.getElementsByTagName("link")[0].childNodes[0].nodeValue;
  post.description = item.getElementsByTagName("description")[0].childNodes[0].nodeValue;
  var date = item.getElementsByTagName("dc:date")[0];
  if (date != null){
    post.date = new Date(date.textContent);
  } else{
    post.date = new Date(0);
  }

  return post;
}

//Determines if a post qualifies under user criteria
function checkPostTopics(doc, selectedOptions, location) {
  //At least one user-selected topic should match
  var topicFound = false;
  selectedOptions.forEach(function(option) {
    if (doc.match("#" + option).found){
      topicFound = true;
    }
  });

  //Location should not match user's location
  var otherLocation = false;
  if (!doc.match("#" + location).found) {
    otherLocation = true;
  }

  return topicFound && otherLocation;
}

//Filters new posts based on date and topics
function filterPosts(items, lastDate, selectedOptions, location) {
  var newPosts = [];
  var nlp = require("compromise");
  var lexicon = require("../lexicon.json");

  Array.from(items).forEach(function(item) {
    var post = parsePost(item);
    var prevDate = new Date(lastDate);
    if (post.date > prevDate) {
      var doc = nlp(post.description + " " + post.title + " " + post.tag, lexicon);
      if (checkPostTopics(doc, selectedOptions, location)) {
        post.topics = doc.topics().out("array");
        newPosts.push(post);
      }
    }
  });
  if (newPosts.length > 0) {
    var currentPost = newPosts[0];
    showPost(currentPost);
    newPosts.splice(0, 1);
    chrome.storage.local.get("posts", function(existingPosts) {
      storePosts(newPosts, existingPosts);
    });
  } else {
    chrome.storage.local.get("posts", useExistingPost);
  }
}

//Randomly picks a post to display
function pickPost(feedData) {
  var xmlDoc = parseXML(feedData);
  var items = xmlDoc.getElementsByTagName("item");

  chrome.storage.sync.get({
    lastDate: 0,
    selectedOptions: ["Business", "Politics"],
    location: "North America"
  }, function(options) {
    filterPosts(items, options.lastDate, options.selectedOptions, options.location);
  });
}

//Calls background page to retrieve RSS feed
function getPosts() {
  chrome.runtime.sendMessage("onoindacglppmommbbakiflnaemdoemg", {
      action: "fetch_feed",
      url: 'http://www.rssmix.com/u/8269737/rss.xml'
    },
    function(response) {
      pickPost(response);
    }
  );
}

document.addEventListener("DOMContentLoaded", function(event) {
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

  //Getting quote
  getQuote();

  //Getting articles from RSS feed
  getPosts();
});
