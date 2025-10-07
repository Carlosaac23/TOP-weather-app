const fetchBtn = document
  .getElementById('fetchBtn')
  .addEventListener('click', getWeatherData);

async function getWeatherData() {
  const location = document
    .getElementById('location')
    .value.toLowerCase()
    .trim();
  const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${process.env.VISUAL_CROSSING_API_KEY}`;

  try {
    const res = await fetch(URL);
    const data = await res.json();
    processData(data);
  } catch (error) {
    alert(error);
  }
}

function processData(data) {
  const { address: city, description, timezone } = data;
  const { conditions, icon, temp } = data.currentConditions;

  renderData({ city, description, timezone, conditions, icon, temp });
}

function renderData(data) {
  console.log(data);
  const { city, description, timezone, conditions, icon, temp } = data;
  const iconURL = `https://github.com/visualcrossing/WeatherIcons/raw/main/SVG/2nd%20Set%20-%20Color/${icon}.svg`;
}
