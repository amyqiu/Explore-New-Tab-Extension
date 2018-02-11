// Remove post from saved posts to display
function useExistingPost(options) {
  console.log("Retrieved previous posts: ", options.posts);

  var post = options.posts.pop();
  showPost(post);
  storePosts([], options.posts);
}

// Update storage with new posts
function storePosts(newPosts, existingPosts) {
  newPosts.push.apply(newPosts, existingPosts);

  chrome.storage.local.set({
    "posts": newPosts
  });
  chrome.storage.sync.set({
    "lastDate": new Date().toString()
  });
}

// Add html to display post
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

// Determine if a post qualifies under user criteria
function checkPostTopics(doc, selectedTopics, location) {
  //At least one user-selected topic should match
  var topicFound = false;
  selectedTopics.forEach(function(option) {
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

// Convert xml to post object
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

// Filter new posts based on date and topics
function filterPosts(items, lastDate, selectedTopics, location) {
  var newPosts = [];
  var nlp = require("compromise");
  var lexicon = require("../nlp/lexicon.json");

  Array.from(items).forEach(function(item) {
    var post = parsePost(item);
    var prevDate = new Date(lastDate);
    if (post.date > prevDate) {
      var doc = nlp(post.description + " " + post.title + " " + post.tag, lexicon);
      if (checkPostTopics(doc, selectedTopics, location)) {
        post.topics = doc.topics().out("array");
        newPosts.push(post);
      }
    }
  });
  if (newPosts.length > 0) {
    var currentPost = newPosts.pop();
    showPost(currentPost);
    chrome.storage.local.get("posts", function(existingPosts) {
      storePosts(newPosts, existingPosts);
    });
  } else {
    chrome.storage.local.get("posts", useExistingPost);
  }
}

// Pick a post to display
function pickPost(feedData) {
  var xmlDoc = parseXML(feedData);
  var items = xmlDoc.getElementsByTagName("item");

  chrome.storage.sync.get({
    lastDate: 0,
    selectedTopics: ["Business", "Politics"],
    location: "North America"
  }, function(options) {
    filterPosts(items, options.lastDate, options.selectedTopics, options.location);
  });
}

// Call background page to retrieve RSS feed
function getPosts() {
  chrome.runtime.sendMessage("onoindacglppmommbbakiflnaemdoemg", {
      action: "fetch_feed",
      url: "http://www.rssmix.com/u/8269737/rss.xml"
    },
    function(response) {
      pickPost(response);
    }
  );
}

document.addEventListener("DOMContentLoaded", function(event) {
  getQuote();
  getPosts();
  setUpBookmark();
});
