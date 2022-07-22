// Init the values
import { WeatherService } from "./service.js";
import { domEle } from "./dom-ele.js";

const weather = new WeatherService();
export class Init {
  constructor() {}
  init() {
    weather.getCities().then((cities) => {
      this.populateCitiesDropDown(cities);
    });
    domEle.citiesList.addEventListener("change", () => {
      this.getCitiesWeather(
        citiesList.value.split(",")[0],
        citiesList.value.split(",")[1],
        citiesList.value.split(",")[2]
      );
      domEle.cityName.innerHTML = citiesList.value.split(",")[0];
    });
  }

  populateCitiesDropDown(cities) {
    cities.forEach((city, index) => {
     domEle.citiesList.options.add(
        new Option(city.nm, [city.nm, city.lat, city.lon], true)
      );
      domEle.cityName.innerHTML = cities[0].nm;
      if (index === 0) this.getCitiesWeather(city.nm, city.lat, city.lon);
    });
  }
  getCitiesWeather(city, lat, lon) {
    let urlWeather = weather.updateUrl("weather", city);
    let forecast = weather.updateUrl("forecast", "", Number(lat), Number(lon));
    let loader = `<div id="loading"></div>`;
    domEle.bodyLoader.innerHTML = loader;
    Promise.all([urlWeather, forecast]).then(
      async ([cityWeather, forecastWeather]) => {
        this.showWeatherIcon(cityWeather, forecastWeather);
        this.showForecastWeatherIcon(forecastWeather);
      }
    ).then(()=>{
        domEle.bodyLoader.innerHTML = '';
    })
  }

  showWeatherIcon(cityWeather) {
    domEle.cityWeatherIcon.innerHTML = `<div class="wi wi-icon-${cityWeather.weather[0].id}"><div>`;
    domEle.cityWeatherTemp.innerHTML = `<div class="degree"> ${cityWeather.main.temp}</div>`;
    domEle.bodyLoader.innerHTML = "";
  }

  showForecastWeatherIcon(weather) {
    // API has data weather list of every 4 hours, filter data for one day
    weather.list = weather.list.filter((val, i) => {
      if (i % 8 === 0) return val;
    });

    let result = "";
    let target = domEle.weatherForecast;
    for (var i = 1; i <= 3; i++) {
      result +=
        "<div class='temp-wrapper'>" +
        "<div class='day'>" +
        new Date(weather.list[i].dt_txt).toLocaleDateString("en-US", {
          weekday: "long",
        }) +
        "</div>" +
        "<div class='temp-icon'>" +
        "<div class='wi-font wi wi-icon-" +
        weather.list[i].weather[0].id +
        "'" +
        "></div></div>" +
        "<div class='temp-max degree'>" +
        weather.list[i].main.temp_max +
        "</div>" +
        "<div class='temp-min degree'>" +
        weather.list[i].main.temp_min +
        "</div>" +
        "</div>";
    }
    target.innerHTML = result;
  }
}
const init = new Init();
init.init();
