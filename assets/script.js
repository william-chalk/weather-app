// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

//Date
//Temp main.temp
//Wind wind.speed
//Humidity main.humidity
//UV Index
var weatherDisplayEl = document.querySelector("#weatherDisplayPanel");
var weatherCardEl = document.querySelector("#weatherCard");
var date = moment(new Date());
var displayDate = date.format("MMMM Do YYYY");
var API_key = "ed9ef953ef6521e093fab28917034f9e";
var fiveDayApi = "d91f911bcf2c0f925fb6535547a5ddc9";

function searchBtnClick() {
  $(".searchBtn").on("click", function () {
    var userInput = document.getElementById("searchCity").value;
    localStorage.setItem("city", userInput);
    let weatherAPICurrent = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${API_key}&units=imperial`;
    var weatherDisplay = document.getElementById("weatherDisplayPanel");
    var weatherCard = document.getElementById("weatherCard");
    console.log(JSON.stringify(userInput));

    fetch(weatherAPICurrent).then(function (response) {
      if (response.ok) {
        response.json().then((data) => {
          displayWeatherDisplay(data);
          let lat = data.coord.lat;
          let lon = data.coord.lon;
          displayCards(lat, lon);
        });
      }
    });
  });
}

var displayWeatherDisplay = function (data) {
  console.log(data);
  if (data.length === 0) {
    alert("City not found");
    return;
  }

  document.querySelector("#city-date").textContent = data.name;
  document.querySelector("#temp").textContent = "Temp : " + data.main.temp;
  document.querySelector("#wind").textContent = "Wind : " + data.wind.speed;
  document.querySelector("#humid").textContent =
    "Humid : " + data.main.humidity;
};

let fiveDayContainer = document.querySelector("#five-day-container");

function displayCards(lat, lon) {
  let weatherAPIFive = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${fiveDayApi}&units=imperial`;
  //   let weatherAPIFive = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}&units=imperial&exclude=minutely,hourly`;
  fetch(weatherAPIFive)
    .then((response) => response.json())
    .then((cityData) => {
      console.log(cityData);
      for (let i = 1; i < 6; i++) {
        let card = document.createElement("div");
        card.classList.add("card", "flex-row", "d-flex");
        fiveDayContainer.append(card);

        let cardBody = document.createElement("div");
        cardBody.classList.add(
          "card-body",
          "d-flex",
          "flex-column",
          "weatherCards"
        );
        cardBody.setAttribute("id", "weatherCard");
        card.append(cardBody);

        let cardDate = document.createElement("h3");
        cardDate.textContent = moment().add(i, "days").format("dddd");
        cardDate.classList.add("card-title");
        cardDate.setAttribute("id", "card-date");
        cardBody.append(cardDate);
        let cardTemp = document.createElement("p");
        cardTemp.textContent = "Temp: " + cityData[i].daily.temp.day;
        cardBody.append(cardTemp);
        let cardWind = document.createElement("p");
        cardWind.textContent = "Wind: " + cityData[i].daily.wind_speed;
        cardBody.append(cardWind);
        let cardHumid = document.createElement("p");
        cardHumid.textContent = "Humid: " + cityData[i].daily.humidity;
        cardBody.append(cardHumid);
      }
    });
}

var saveCity = function () {};

var loadCity = function () {};

searchBtnClick();
