function setUpBookmark() {
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
}
