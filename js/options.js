function saveOptions() {
  var topics = document.getElementsByClassName("topic");
  var selectedTopics = [];
  for (var i = 0; i < topics.length; ++i) {
    if (topics[i].checked) {
      var capitalizedTopic = topics[i].id.charAt(0).toUpperCase() + topics[i].id.slice(1);
      selectedTopics.push(capitalizedTopic);
    }
  }
  var location = document.getElementById("location").value.replace(/\s/g, '');

  chrome.storage.sync.set({
    selectedTopics: selectedTopics,
    location: location
  });
}

function restoreOptions() {
  chrome.storage.sync.get({
    selectedTopics: ["Business", "Politics"],
    location: "North America"
  }, function(options) {
    var topics = options.selectedTopics;
    topics.forEach(function(topic) {
      document.getElementById(topic.toLowerCase()).checked = true;
    });
    var location = options.location;
    document.getElementById("location").value = location;
  });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
