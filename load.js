let cities;
let optionItems = document.getElementById("citiesList").options;

let key = "abe1eb51289c21c167c66ce790c2fac3";
let lang = "en";
let lat, lon, forecast, url, urlWeather;
let apiTypekey;

fetch("cities-fr.json")
  .then((response) => {
    return response.json();
  })
  .then((jsondata) => {
    cities = jsondata;
    populateCitiesDropDown();
  });

function populateCitiesDropDown() {
  cities.forEach((city, index) => {
    if (index === 0) {
      lat = city.lat;
      lon = city.lon;
      optionItems.add(new Option(city.nm, [city.lat, city.lon], true));
      document.getElementById("city-name").innerHTML = city.nm;
      getCitiesWeather(city.nm, lat, lon);
    } else {
      optionItems.add(new Option(city.nm, [city.lat, city.lon]));
    }
  });
}

function updateUrl(apiTypekey = "weather") {
  return `https://api.openweathermap.org/data/2.5/${apiTypekey}?units=metric&appid=${key}&`;
}

function getSelectedItem() {
    getCitiesWeather(
        document.getElementById("citiesList").options[document.getElementById("citiesList").selectedIndex].text,
        document.getElementById("citiesList").options[document.getElementById("citiesList").selectedIndex].value.split(',')[0],
        document.getElementById("citiesList").options[document.getElementById("citiesList").selectedIndex].value.split(',')[1]
    )
    document.getElementById("city-name").innerHTML = 
    document.getElementById("citiesList").options[document.getElementById("citiesList").selectedIndex].text;


}

function getCitiesWeather(city, lat, lon) {
  urlWeather = updateUrl() + "q=" + city;
  forecast = updateUrl("forecast") + "lat=" + Number(lat) + "&lon=" + Number(lon);
  let loader = `<div id="loading"></div>`;
  document.getElementById("bodyLoader").innerHTML = loader;
  Promise.all([fetch(urlWeather), fetch(forecast)])
    .then(async ([cityWeather, forecastWeather]) => {
      let cityWeatherData = await cityWeather.json();
      let forecastWeatherData = await forecastWeather.json();
      console.log(cityWeatherData.main.temp ,"temp")

      document.getElementById("cityWeatherIcon").innerHTML =
        '<div class="wi wi-icon-' + cityWeatherData.weather[0].id + '"><div>';
      document.getElementById("cityWeatherTemp").innerHTML =
        "<div class='degree'>" + Number(cityWeatherData.main.temp) + "</div>";
      document.getElementById("bodyLoader").innerHTML = "";
      forecastWeatherData.list = forecastWeatherData.list.filter((val, i) => {
        if (i % 8 === 0) return val;
      });

      let result = "";
      let target = document.getElementById("weatherForecast");
      for (var i = 1; i <= 3; i++) {
        result +=
          "<div class='temp-wrapper'>" +
          "<div class='day'>" +
          new Date(forecastWeatherData.list[i].dt_txt).toLocaleDateString(
            "en-US",
            { weekday: "long" }
          ) +
          "</div>" +
          "<div class='temp-icon'>" +
          "<div class='wi-font wi wi-icon-" +
          forecastWeatherData.list[i].weather[0].id +
          "'" +
          "></div></div>" +
          "<div class='temp-max degree'>" +
          forecastWeatherData.list[i].main.temp_max +
          "</div>" +
          "<div class='temp-min degree'>" +
          forecastWeatherData.list[i].main.temp_min +
          "</div>" +
          "</div>";
      }
      target.innerHTML = result;
    })
    .catch((err) => {
      console.log(err);
    });
}
