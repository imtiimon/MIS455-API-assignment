function searchCountry(event) {
  event.preventDefault();

  var inputElement = document.getElementById("searchInput");
  var countryInfoElement = document.getElementById("countryInfo");

  var countryName = inputElement.value;

  fetchCountryData(countryName)
    .then((country) => {
      if (country) {
        var flagUrl = getFlagUrl(country.flags);

        var countryInfo = `
          <div style="text-align: center; margin-bottom: 10px;">
            <h2 style="font-size: 24px; color: #007bff; margin: 0 0 3px 0;">${
              country.name.common
            }</h2>
          </div>
          <div style="display: flex;">
            <div style="flex: 30%; margin: 3px;">
              <img src="${flagUrl}" alt="${
          country.name.common
        } Flag" style="width: 100%; max-width: 200px; max-height: 120px; border-radius: 8px;">
            </div>
            <div style="flex: 70%; padding-left: 10px; display: flex; flex-wrap: wrap; justify-content: space-between;">
              <div class="country-data"><b>Capital:</b> ${country.capital}</div>
              <div class="country-data"><b>Region:</b> ${country.region}</div>
              <div class="country-data"><b>Population:</b> ${
                country.population
              }</div>
              <div class="country-data"><b>Area:</b> ${country.area} km²</div>
              <div class="country-data"><b>Continent:</b> ${getFirstValue(
                country.continents
              )}</div>
              <div class="country-data"><b>Languages:</b> ${getLanguages(
                country.languages
              )}</div>
              <button class="btn btn-outline-success" style="margin-top: 5px;" onclick="showMoreDetails('${countryName}', ${
          country.latlng[0]
        }, ${country.latlng[1]})">
                More Details
              </button>
            </div>
          </div>
        `;
        countryInfoElement.innerHTML = countryInfo;

        // Show the container
        countryInfoElement.style.display = "block";
      } else {
        // Display an error message if the country is not found
        countryInfoElement.innerHTML = "<p>Country not found</p>";

        // Hide the container
        countryInfoElement.style.display = "none";
      }
    })
    .catch((error) => {
      console.error("Error fetching country data:", error);
      countryInfoElement.innerHTML = "<p>Error fetching country data</p>";

      // Hide the container
      countryInfoElement.style.display = "none";
    });
}

function showMoreDetails(countryName, latitude, longitude) {
  // You can implement the logic to show more details or navigate to another page here
  console.log(`More details for ${countryName}`);
}

function fetchCountryData(countryName) {
  return fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((response) => response.json())
    .then((data) => (data.length > 0 ? data[0] : null));
}

function getFlagUrl(flags) {
  return flags ? flags.png : "";
}

function getFirstValue(arr) {
  return arr ? arr[0] : "";
}

function getLanguages(languages) {
  return languages ? Object.values(languages).join(", ") : "";
}
