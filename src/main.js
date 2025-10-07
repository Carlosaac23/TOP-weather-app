import { formatIconName } from './utils/domUtils';
import './styles/reset.css';
import './styles/style.css';

const fetchBtn = document.querySelector('.container__btn');
fetchBtn.addEventListener('click', getWeatherData);

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

async function getWeatherGif(conditions) {
	const URL = `https://api.giphy.com/v1/stickers/translate?api_key=${process.env.GIPHY_API_KEY}&s=${conditions}`;

	try {
		const res = await fetch(URL);
		const data = await res.json();
		renderWeatherGif(data);
	} catch (error) {
		alert(error);
	}
}

function renderWeatherGif(data) {
	const { url } = data.data.images.original;
	const img = document.createElement('img');
	img.src = url;

	document.body.appendChild(img);
}

function processWeatherData(data) {
	const { address: city, description, timezone } = data;
	const { conditions, icon, temp } = data.currentConditions;

	renderWeatherData({ city, description, timezone, conditions, icon, temp });
}

function renderWeatherData(data) {
	console.log(data);
	const { city, description, timezone, conditions, icon, temp } = data;
	const gifConditions = formatIconName(icon);
	console.log(gifConditions);
	getWeatherGif(conditions);
	const iconURL = `https://github.com/visualcrossing/WeatherIcons/raw/main/SVG/2nd%20Set%20-%20Color/${icon}.svg`;
}
