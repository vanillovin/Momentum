const API_KEY = '9d5a6cbe515858f312ea0c292fbb8642';
const weatherText = document.querySelector('.weather-text');

function onGeoOk(position) {
  const lat = position.coords.latitude; // 위도
  const lon = position.coords.longitude; // 경도
  const url = `https`://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const weather = document.querySelector('.js-weather span');
      weather.innerText = `${data.name} - ${data.weather[0].main}`;
    });
}

function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
