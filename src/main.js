import {
	capitalize,
	fahrenheitToCelcius,
	formatTimezone,
	formatWords,
} from './utils/domUtils';
import './styles/reset.css';
import './styles/style.css';

const fetchBtn = document.querySelector('.container__btn');
fetchBtn.addEventListener('click', getWeatherData);

const weatherCard = document.querySelector('.weather__card-container');
const weatherCardLeft = document.querySelector(
	'.weather__card-container .left',
);
const weatherCardRight = document.querySelector(
	'.weather__card-container .right',
);

console.log(weatherCardLeft);
console.log(weatherCardRight);

async function getWeatherData() {
	const location = document
		.getElementById('location')
		.value.toLowerCase()
		.trim();
	const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${process.env.VISUAL_CROSSING_API_KEY}`;

	try {
		const res = await fetch(URL);
		const data = await res.json();
		processWeatherData(data);
	} catch (error) {
		alert(error);
	}
}

function processWeatherData(data) {
	console.log(data);
	const { address: city, description, timezone } = data;
	const { conditions, icon, temp } = data.currentConditions;

	renderWeatherData({ city, description, timezone, conditions, icon, temp });
}

function renderWeatherData(data) {
	console.log(data);
	const { city, description, timezone, conditions, icon, temp } = data;
	const gifConditions = formatWords(icon);
	console.log(gifConditions);
	addCustomBackground(icon);
	const iconURL = `https://github.com/visualcrossing/WeatherIcons/raw/main/SVG/2nd%20Set%20-%20Color/${icon}.svg`;

	weatherCardLeft.innerHTML = '';
	weatherCardRight.innerHTML = '';

	const iconEl = document.createElement('img');
	iconEl.classList.add('weather__card-icon');
	iconEl.src = iconURL;
	iconEl.alt = icon;

	const temperatureEl = document.createElement('p');
	temperatureEl.classList.add('weather__card-temperature');
	temperatureEl.textContent = `${fahrenheitToCelcius(temp)} ℃`;

	const conditionsEl = document.createElement('p');
	conditionsEl.classList.add('weather__card-conditions');
	conditionsEl.textContent = conditions;

	const timezoneEl = document.createElement('p');
	timezoneEl.classList.add('weather__card-timezone');
	timezoneEl.textContent = formatTimezone(timezone);

	const cityEl = document.createElement('h2');
	cityEl.classList.add('weather__card-city');
	cityEl.textContent = capitalize(city);

	const descriptionEl = document.createElement('p');
	descriptionEl.classList.add('weather__card-description');
	descriptionEl.textContent = description;

	weatherCardLeft.appendChild(iconEl);
	weatherCardLeft.appendChild(temperatureEl);
	weatherCardLeft.appendChild(conditionsEl);
	weatherCardRight.appendChild(timezoneEl);
	weatherCardRight.appendChild(cityEl);
	weatherCardRight.appendChild(descriptionEl);
}

function addCustomBackground(conditions) {
	const backgrounds = {
		rain: '(315deg,rgba(237, 251, 255, 1) 0%, rgba(91, 191, 207, 1) 100%)',
		fog: '(315deg,rgba(237, 251, 255, 1) 0%, rgba(207, 207, 207, 1) 100%)',
	};

	const cleanConditions = formatWords(conditions);

	if (cleanConditions === 'rain') {
		weatherCard.style.background = `linear-gradient${backgrounds.rain}`;
		weatherCard.style.display = 'flex';
	} else if (cleanConditions === 'fog') {
		weatherCard.style.background = `linear-gradient${backgrounds.fog}`;
		weatherCard.style.display = 'flex';
	}
}
