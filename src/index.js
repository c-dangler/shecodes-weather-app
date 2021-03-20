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
    document.querySelector("#city").innerHTML = `${response.data.name}, ${response.data.sys.country}`;
    document.querySelector("h2#current-temp").innerHTML = `${Math.round(response.data.main.temp)}° F`;
    document.querySelector("h2#current-weather").innerHTML = response.data.weather[0].main;
    document.querySelector("h5#current-humidity").innerHTML = `Humidity: ${response.data.main.humidity}%`;
    document.querySelector("h5#current-wind").innerHTML = `Wind: ${Math.round(response.data.wind.speed)} mph`;
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

  let currentLocationButton = document.querySelector("#current-location");
  currentLocationButton.addEventListener("click", currentCityWeather);

search("New York");