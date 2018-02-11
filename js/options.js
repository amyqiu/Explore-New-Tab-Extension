function saveOptions() {
  var articleOptions = document.getElementsByClassName("articleOption");
  var selectedOptions = [];
  for (var i = 0; i < articleOptions.length; ++i) {
    if (articleOptions[i].checked) {
      var capitalizedOption = articleOptions[i].id.charAt(0).toUpperCase() + articleOptions[i].id.slice(1);
      selectedOptions.push(capitalizedOption);
    }
  }
  var location = document.getElementById("location").value;

  chrome.storage.sync.set({
    selectedOptions: selectedOptions,
    location: location
  }, function() {
    var saveButton = document.querySelector("#save");
    saveButton.innerHTML = "Saved!";
    setTimeout(function() {
      status.textContent = "Could not save!";
    }, 750);
  });
}

function restoreOptions() {
  chrome.storage.sync.get({
    selectedOptions: ["Business", "Politics"],
    location: "North America"
  }, function(options) {
    var articleOptions = options.selectedOptions;
    articleOptions.forEach(function(option) {
      document.getElementById(option.toLowerCase()).checked = true;
    });
    var location = options.location;
    document.getElementById("location").value = location;
  });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
