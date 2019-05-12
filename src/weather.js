const API_BASE = 'https://api.openweathermap.org/data/2.5/weather?q=Brno,cz&units=metric&lang=cz&appid=b4c737ebf27b5879306544b3f666163c';
const API_BASE_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast?q=Brno,cz&units=metric&lang=cz&appid=b4c737ebf27b5879306544b3f666163c';

import getWeatherIcon from './weather-icons';

export default class Weather {
	constructor() {
	}

	getWeather(){
		fetch(API_BASE)
		.then(response => response.json())
		.then(data => {
			this.showWeather(data);
		})
	}

	showWeather(data) {
		let pocasi = document.querySelector('.weather');
		let html = pocasi.innerHTML;
		html = `
			<div class="weather__current">
      <h2 class="weather__city" id="mesto">
			${data.name}
      </h2>

      <div class="weather__inner weather__inner--center">
        <div class="weather__section weather__section--temp">
          <span class="weather__temp-value" id="teplota">${Math.round(data.main.temp)}</span>
          <span class="weather__temp-unit">°C</span>
          <div class="weather__description" id="popis">${data.weather[0].description}</div>
        </div>
        <div class="weather__section weather__section--icon" id="ikona">
				${getWeatherIcon(data.weather[0].id, data.weather[0].icon)}
        </div>
      </div>

      <div class="weather__inner">
        <div class="weather__section">
          <h3 class="weather__title">Vítr</h3>
          <div class="weather__value">
            <span id="vitr">${data.wind.speed}</span> km/h
          </div>
        </div>
        <div class="weather__section">
          <h3 class="weather__title">Vlhkost</h3>
          <div class="weather__value">
            <span id="vlhkost">${data.main.humidity}</span> %
          </div>
        </div>
      </div>

      <div class="weather__inner">
        <div class="weather__section">
          <h3 class="weather__title">Východ slunce</h3>
          <div class="weather__value">
            <span id="vychod">${(new Date(data.sys.sunrise * 1000)).getHours() + ':' + (new Date(data.sys.sunrise * 1000)).getMinutes()}</span>
          </div>
        </div>
        <div class="weather__section">
          <h3 class="weather__title">Západ slunce</h3>
          <div class="weather__value">
            <span id="zapad">${(new Date(data.sys.sunset * 1000)).getHours() + ':' + (new Date(data.sys.sunset * 1000)).getMinutes()}</span>
          </div>
        </div>
      </div>
    </div>
			` + html;
		pocasi.innerHTML = html;
	}

	getForecast(){
		fetch(API_BASE_FORECAST)
		.then(response => response.json())
		.then(data => {
			this.showForecast(data);
		})
	}

	showForecast(data) {
		let predpoved = document.querySelector('#predpoved');
		var dny = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'];
		let html = ` `;
		data.list.forEach((pocasi, index) => {
			if (index === 8 || index === 16 || index === 24 || index === 32)
				html += `
					<div class="forecast">
					<div class="forecast__day">
						${dny[(new Date(pocasi.dt * 1000)).getDay()] + ' ' + (new Date(pocasi.dt * 1000)).getDate() + '. ' + ((new Date(pocasi.dt * 1000)).getMonth() + 1) + '.'}
					</div>
					<div class="forecast__icon">
						${getWeatherIcon(pocasi.weather[0].id, pocasi.weather[0].icon)}
					</div>
					<div class="forecast__temp">
						${Math.round(pocasi.main.temp) + ' °C'}
					</div>
				</div>
					`;
		});
		predpoved.innerHTML = html;
	}
}