// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $datetimeInput = document.querySelector("#datetime");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
var $loadMoreBtn = document.querySelector("#load-btn");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);
// Add an event listener to the button, call handleButtonClick when clicked
$loadMoreBtn.addEventListener("click", handleButtonClick);

// Set a startingIndex and resultsPerPage variable
var startingIndex = 0;
var resultsPerPage = 500;

function renderTableSection() {
  // Set the value of endingIndex to startingIndex + resultsPerPage
  var endingIndex = startingIndex + resultsPerPage;
  // Get a section of the addressData array to render
  var addressSubset = dataSet.slice(startingIndex, endingIndex);
  for (var i = 0; i < addressSubset.length; i++) {
    // Get the current address object and its fields
    var address = addressSubset[i];
    var fields = Object.keys(address);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i + startingIndex);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell and set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = address[field];
    }
  }
}

function handleButtonClick() {
  // Increase startingIndex by resultsPerPage, render the next section of the table
  startingIndex += resultsPerPage;
  renderTableSection();
  // Check to see if there are any more results to render
  if (startingIndex + resultsPerPage >= addressData.length) {
    $loadMoreBtn.classList.add("disabled");
    $loadMoreBtn.innerText = "All Records Loaded";
    $loadMoreBtn.removeEventListener("click", handleButtonClick);
  }
}


function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredAddresses.length; i++) {
    console.log(filteredAddresses.length)
    // Get get the current address object and its fields
    var address = filteredAddresses[i];
    var fields = Object.keys(address);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = address[field];
    }
  }
}


function handleSearchButtonClick() {
  
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterDatetime = $datetimeInput.value.trim().toLowerCase();
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();
  

  // Set filteredAddresses to an array of all addresses whose "state" matches the filter
  
  filteredAddresses = dataSet.filter(function(address) {    
    var addressDatetime = address.datetime.toLowerCase();
    var addressCity = address.city.toLowerCase();
    var addressState = address.state.toLowerCase();
    var addressCountry = address.country.toLowerCase();
    var addressShape = address.shape.toLowerCase();
  

    if ((addressDatetime === filterDatetime || filterDatetime == "")
         && (addressCity === filterCity || filterCity=="")
         && (addressState === filterState || filterState=="")
         && (addressCountry === filterCountry || filterCountry=="")
         && (addressShape === filterShape || filterShape=="")
         ) {return true;}
        return false;
    });
  renderTable();
    }

// Render the table for the first time on page load
// Render the table for the first time on page load
renderTableSection();
// @TODO: YOUR CODE HERE!
