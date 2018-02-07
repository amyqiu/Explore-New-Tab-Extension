var url;
var title;

function show_post(post){
  var item = '';
  item += '<div class="post">';
  item += '<a href="' + post.url + '">\
            <span>' + post.title + '...</span>\
          </div>\
        </a>';
  item += '</div>';
  $('#popup').append(item);
  url = post.url;
  //title = post.title;
  title = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nunc metus, finibus in metus ut, rutrum luctus dui. Phasellus ultrices lacus id consectetur interdum. Aliquam erat volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam sed vestibulum ipsum. Mauris ut eros sed sem faucibus cursus vel sed eros. Sed auctor quam vitae ligula mattis, non faucibus massa faucibus. Donec tincidunt ipsum quis pretium efficitur. Duis ac ultricies lorem, sit amet vulputate velit. Vestibulum varius turpis non odio pharetra vehicula nec a quam. Maecenas tincidunt elit sit amet nibh bibendum cursus. Ut sed suscipit mi. Nullam elementum ligula nibh, in facilisis mi laoreet pharetra. Phasellus fringilla, elit nec accumsan bibendum, dui justo hendrerit neque, a elementum elit dui eu velit.";

}

function store_posts(newPosts, existingPosts){
  newPosts.push.apply(newPosts, existingPosts);

  chrome.storage.local.set({'posts': newPosts});
  chrome.storage.local.set({'lastDate': new Date().toString()});
}

function use_existing_post(existingPosts){
  console.log("Retrieved previous posts: ", existingPosts.posts);

  show_post(existingPosts.posts[0]);
  existingPosts.posts.splice(0,1);
  store_posts([], existingPosts.posts);
}

function check_topics(doc){
  if (doc.match('#Country').found){
    return true;
  } else if (doc.match('#Politics').found){
    return true;
  } else if (doc.match('#Business').found){
    return true;
  }
  return false; //CHANGE!!
}

function filter_latest_posts(items, lastDate){
  var newPosts = [];
  var nlp = require('compromise');
  var lexicon = require('../lexicon.json');

  $.each(items, function (index, value){
    var item = value;
    var post = parse_post(item);
    var prevDate = new Date(lastDate);
    if (post.date > prevDate) {
      var doc = nlp(post.description + " " + post.title + " " + post.tag, lexicon);
      if (check_topics(doc)){
        post.topics = doc.topics().out('array');
        newPosts.push(post);
      }
    }
  });
  if (newPosts.length > 0){
    var currentPost = newPosts[0];
    show_post(currentPost);
    newPosts.splice(0,1);
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

  chrome.storage.local.get('lastDate', function(date) {
    filter_latest_posts(items, date.lastDate);
  });
}

//Calls background page to retrieve RSS feed
function fetch_feed() {
  chrome.runtime.sendMessage("onoindacglppmommbbakiflnaemdoemg", {action : 'fetch_feed', url : 'http://www.rssmix.com/u/8269737/rss.xml'},
    function(response) {
      display_post(response);
    }
  );
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
