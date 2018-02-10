// Saves options to chrome.storage
function save_options() {
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
    // Update status to let user know options were saved.
    var saveButton = document.querySelector('#save');
    saveButton.innerHTML = "Saved!";
    setTimeout(function() {
      status.textContent = 'Could not save!';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    selectedOptions: ['Business', 'Politics'],
    location: "North America"
  }, function(items) {
    var articleOptions = items.selectedOptions;
    articleOptions.forEach(function(option) {
      document.getElementById(option.toLowerCase()).checked = true;
    });
    var location = items.location;
    document.getElementById('location').value = location;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
  save_options);
