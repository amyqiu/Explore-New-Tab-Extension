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

function storePosts(newPosts, existingPosts) {
  newPosts.push.apply(newPosts, existingPosts);

  chrome.storage.local.set({
    "posts": newPosts
  });
  chrome.storage.sync.set({
    "lastDate": new Date().toString()
  });
}

function useExistingPost(options) {
  console.log("Retrieved previous posts: ", options.posts);

  showPost(options.posts[0]);
  options.posts.splice(0, 1);
  storePosts([], options.posts);
}

function checkTopics(doc, selectedOptions, location) {
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

function filterPosts(items, lastDate, selectedOptions, location) {
  var newPosts = [];
  var nlp = require("compromise");
  var lexicon = require("../lexicon.json");

  Array.from(items).forEach(function(item) {
    var post = parsePost(item);
    var prevDate = new Date(lastDate);
    if (post.date > prevDate) {
      var doc = nlp(post.description + " " + post.title + " " + post.tag, lexicon);
      if (checkTopics(doc, selectedOptions, location)) {
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

//Randomly picks an article to display
function displayPost(feedData) {
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
      displayPost(response);
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
  fetchQuote();

  //Getting articles from RSS feed
  getPosts();
});
