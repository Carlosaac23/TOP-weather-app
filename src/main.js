import {
	capitalize,
	fahrenheitToCelcius,
	formatTimezone,
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
	const { address: city, description, timezone } = data;
	const { conditions, icon, temp } = data.currentConditions;

	renderWeatherData({ city, description, timezone, conditions, icon, temp });
}

function renderWeatherData(data) {
	const { city, description, timezone, conditions, icon, temp } = data;
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
	const conditionsStatement = [
		'rain',
		'clear-day',
		'clear-night',
		'cloudy',
		'fog',
		'hail',
		'partly-cloudy-day',
		'partly-cloudy-night',
		'rain-snow-showers-day',
		'rain-snow-showers-night',
		'rain-snow',
		'rain',
		'showers-day',
		'showers-night',
		'sleet',
		'snow-showers-day',
		'wind',
		'snow-showers-night',
		'snow',
		'thunder-rain',
		'thunder-showers-day',
		'thunder-showers-night',
		'thunder',
	];

	const backgrounds = {
		rain: '(315deg, rgba(237, 251, 255, 1) 0%, rgba(91, 191, 207, 1) 100%)',
		'clear-day':
			'(315deg, rgba(255, 255, 255, 1) 0%, rgba(222, 255, 102, 1) 100%)',
		'clear-night': '(315deg, rgba(40, 60, 99, 1) 0%, rgba(0, 20, 40, 1) 100%)',
		cloudy: '(315deg, rgba(240, 240, 240, 1) 0%, rgba(190, 190, 190, 1) 100%)',
		fog: '(315deg, rgba(237, 251, 255, 1) 0%, rgba(207, 207, 207, 1) 100%)',
		hail: '(315deg, rgba(220, 240, 250, 1) 0%, rgba(160, 190, 210, 1) 100%)',
		'partly-cloudy-day':
			'(315deg, rgba(255, 255, 200, 1) 0%, rgba(180, 210, 230, 1) 100%)',
		'partly-cloudy-night':
			'(315deg, rgba(60, 70, 110, 1) 0%, rgba(30, 40, 70, 1) 100%)',
		'rain-snow-showers-day':
			'(315deg, rgba(220, 240, 255, 1) 0%, rgba(180, 210, 230, 1) 100%)',
		'rain-snow-showers-night':
			'(315deg, rgba(90, 110, 130, 1) 0%, rgba(40, 60, 90, 1) 100%)',
		'rain-snow':
			'(315deg, rgba(210, 230, 250, 1) 0%, rgba(170, 190, 210, 1) 100%)',
		showers: '(315deg, rgba(230, 245, 255, 1) 0%, rgba(120, 180, 210, 1) 100%)',
		'showers-day':
			'(315deg, rgba(230, 245, 255, 1) 0%, rgba(120, 180, 210, 1) 100%)',
		'showers-night':
			'(315deg, rgba(60, 80, 110, 1) 0%, rgba(20, 40, 70, 1) 100%)',
		sleet: '(315deg, rgba(210, 230, 240, 1) 0%, rgba(140, 170, 190, 1) 100%)',
		'snow-showers-day':
			'(315deg, rgba(240, 250, 255, 1) 0%, rgba(190, 220, 240, 1) 100%)',
		'snow-showers-night':
			'(315deg, rgba(70, 90, 120, 1) 0%, rgba(30, 50, 80, 1) 100%)',
		snow: '(315deg, rgba(245, 250, 255, 1) 0%, rgba(210, 230, 250, 1) 100%)',
		wind: '(315deg, rgba(230, 245, 250, 1) 0%, rgba(180, 220, 240, 1) 100%)',
		'thunder-rain':
			'(315deg, rgba(180, 200, 230, 1) 0%, rgba(60, 80, 120, 1) 100%)',
		'thunder-showers-day':
			'(315deg, rgba(220, 235, 255, 1) 0%, rgba(100, 140, 180, 1) 100%)',
		'thunder-showers-night':
			'(315deg, rgba(60, 80, 110, 1) 0%, rgba(20, 30, 50, 1) 100%)',
		thunder: '(315deg, rgba(160, 180, 210, 1) 0%, rgba(50, 70, 100, 1) 100%)',
	};

	if (!conditionsStatement.includes(conditions)) {
		weatherCard.style.background = `#ededed`;
		weatherCard.style.display = 'flex';
		return;
	}

	const nightOrDay = conditions.includes('night');

	weatherCard.style.background = `linear-gradient${backgrounds[conditions]}`;
	weatherCard.style.color = nightOrDay ? '#fafafa' : '#0a0a0a';
	weatherCard.style.display = 'flex';
}
