class WeatherService {
  constructor() {
    this.apiKey = "68658ce0b2f9768a56207bf714634a96";
  }
  async getCities() {
    const response = await fetch("./scripts/cities-fr.json");
    const cities = await response.json();
    return cities;
  }
  async getWeather(apiTypekey) {
    return await fetch(updateUrl(apiTypekey)).json();
  }

  updateUrl(apiTypekey = "weather",city,lat,long) {
    let url = `https://api.openweathermap.org/data/2.5/${apiTypekey}?units=metric&appid=${this.apiKey }`;
    if(apiTypekey === "weather") {
        return this.getWeatherData(`${url}&q=${city}`);
    } else {
        return this.getWeatherData(`${url}&lat=${lat}&lon=${long}`);
    }
  }
  async getWeatherData(url) {
    const response = await fetch(url);
    const weatherData = await response.json();
    return weatherData;
  }
}

export { WeatherService };
