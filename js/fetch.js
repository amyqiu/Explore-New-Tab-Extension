var url;
var title;

function show_post(post) {
  var item = '';
  item += '<div class="post">';
  item += '<a href="' + post.url + '">\
            <span>' + post.title + '...</span>\
          </div>\
        </a>';
  item += '</div>';
  $('#popup').append(item);
  url = post.url;
  title = post.title;
}

function store_posts(newPosts, existingPosts) {
  newPosts.push.apply(newPosts, existingPosts);

  chrome.storage.local.set({
    'posts': newPosts
  });
  chrome.storage.sync.set({
    'lastDate': new Date().toString()
  });
}

function use_existing_post(existingPosts) {
  console.log("Retrieved previous posts: ", existingPosts.posts);

  show_post(existingPosts.posts[0]);
  existingPosts.posts.splice(0, 1);
  store_posts([], existingPosts.posts);
}

function check_topics(doc) {
  var selectedOptions = [];
  var location;
  chrome.storage.sync.get({
    selectedOptions: ['business', 'politics'],
    location: "North America"
  }, function(items) {
    selectedOptions = items.selectedOptions;
    location = items.location;
  });

  if (doc.match('#Country').found) { //Fix to target region??
    return true;
  } else if (doc.match('#Politics').found && selectedOptions.includes("politics")) {
    return true;
  } else if (doc.match('#Economics').found && selectedOptions.includes("economics")) {
    return true;
  } else if (doc.match('#Business').found && selectedOptions.includes("business")) {
    return true;
  } else if (doc.match('#Technology').found && selectedOptions.includes("technology")) {
    return true;
  } else if (doc.match('#Nonprofits').found && selectedOptions.includes("nonprofits")) {
    return true;
  } else if (doc.match('#Art').found && selectedOptions.includes("art")) {
    return true;
  } else {
    return false;
  }
}

function filter_latest_posts(items, lastDate) {
  var newPosts = [];
  var nlp = require('compromise');
  var lexicon = require('../lexicon.json');

  $.each(items, function(index, value) {
    var item = value;
    var post = parse_post(item);
    var prevDate = new Date(lastDate);
    if (post.date > prevDate) {
      var doc = nlp(post.description + " " + post.title + " " + post.tag, lexicon);
      if (check_topics(doc)) {
        post.topics = doc.topics().out('array');
        newPosts.push(post);
      }
    }
  });
  if (newPosts.length > 0) {
    var currentPost = newPosts[0];
    show_post(currentPost);
    newPosts.splice(0, 1);
    console.log("putting these posts into storage: ", newPosts);
    chrome.storage.local.get('posts', function(existingPosts) {
      store_posts(newPosts, existingPosts);
    });
  } else {
    chrome.storage.local.get('posts', use_existing_post);
  }
}

//Randomly picks an article to display
function display_post(feed_data) {
  var xml_doc = $.parseXML(feed_data);
  $xml = $(xml_doc);
  var items = $xml.find("item");

  chrome.storage.sync.get({
    lastDate: 0,
  }, function(date) {
    filter_latest_posts(items, date.lastDate);
  });
}

//Calls background page to retrieve RSS feed
function fetch_feed() {
  chrome.runtime.sendMessage("onoindacglppmommbbakiflnaemdoemg", {
      action: 'fetch_feed',
      url: 'http://www.rssmix.com/u/8269737/rss.xml'
    },
    function(response) {
      display_post(response);
    }
  );
}

$(document).ready(function() {
  //Button for bookmarking articles
  var bookmarkButton = document.querySelector('.bookmark');
  bookmarkButton.addEventListener('click', function() {
    chrome.bookmarks.create({
      'title': title,
      'url': url
    });
    bookmarkButton.classList.add("disabled");
    bookmarkButton.innerHTML = "Bookmarked!";
  });

  //Getting articles from RSS feed
  fetch_feed();
});
