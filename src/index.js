let now = new Date();
let currentTime = document.querySelector("h1#current-time");
let hours = now.getHours();
let minutes = now.getMinutes();

currentTime.innerHTML = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let currentYear = now.getFullYear();
  let currentDay = days[now.getDay()];
  let currentMonth = months[now.getMonth()];
  let currentDate = now.getDate();

  let displayDate = document.querySelector("h4#current-date");
  displayDate.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;

  function displayForecast() {
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    let days = ["Thu", "Fri", "Sat"];
    days.forEach(function(day) {
    forecastHTML = 
      forecastHTML + 
        `
          <div class="col-2">
            <h6 class="forecast-weather-date" id="forecast">
              ${day}
            </h6>
            <img src="http://openweathermap.org/img/wn/10d@2x.png"
            alt=""
            width="40">
            <h6 class="weather-forecast-temperature">
             <span class="weather-forecast-max">
              36°</span>/ 
              <span class="weatherforecast-min">
              22°</span>
            </h6>
        `;
    
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
    });
  }


  function search(city) {
    let apiKey = "b5a9851944a8a2dbfa9331b8d0e3cd69";
    let units = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrl).then(getNewCityWeather);
  }

  function newCity(event) {
    event.preventDefault();
    let displayCity = document.querySelector("#city-search-input");
    search(displayCity.value);
  }
  
  function getNewCityWeather(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("h2#current-temp").innerHTML = `${Math.round(response.data.main.temp)}°`;
    document.querySelector("h1#current-weather").innerHTML = response.data.weather[0].main;
    document.querySelector("h5#current-humidity").innerHTML = `Humidity: ${response.data.main.humidity}%`;
    document.querySelector("h5#current-wind").innerHTML = `Wind: ${Math.round(response.data.wind.speed)} mph`;
    document.querySelector("#main-icon").setAttribute(
      "src", 
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
    document.querySelector("#main-icon").setAttribute("alt", response.data.weather[0].main)
    
    fahrenheitTemperature = response.data.main.temp;
  }
  
  let searchCity = document.querySelector("#city-search-bar");
  searchCity.addEventListener("submit", newCity);

  function currentCityWeather(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
    
    function searchLocation(position) {
    let apiKey = "b5a9851944a8a2dbfa9331b8d0e3cd69";
    let units = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrl).then(getNewCityWeather);
    }
  }

   function displayCelsiusTemperature(event) {
    event.preventDefault();
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    let celsiusTemperature = (fahrenheitTemperature - 32) * 5/9;
    let temperatureElement = document.querySelector("#current-temp");
    temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°`;
  }

  function displayFahrenheitTemperature(event) {
    event.preventDefault();
    fahrenheitLink.classList.add("active");
    celsiusLink.classList.remove("active");
    let temperatureElement = document.querySelector("#current-temp");
    temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}°`;
  }

  
  let fahrenheitTemperature = null;
  
  let currentLocationButton = document.querySelector("#current-location");
  currentLocationButton.addEventListener("click", currentCityWeather);
  
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", displayCelsiusTemperature);

  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
  
  search("New York");
  displayForecast();