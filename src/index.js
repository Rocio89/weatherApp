function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;
  let cityElement = document.querySelector("#current-city");

  // Actualiza el nombre de la ciudad en la interfaz
  cityElement.innerHTML = city;

  // API Key y URL para obtener la temperatura de la ciudad ingresada
  let apiKey = "fd1afeca3o44a5046db9b83ebc1e0tb1";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
  // Extrae y redondea la temperatura actual
  let temperatureCurrent = Math.round(response.data.temperature.current);

  // Obtiene otros datos de la respuesta
  let country = response.data.country;
  let description = response.data.condition.description;

  // Selecciona el elemento de temperatura y actualiza el contenido
  let temperatureElement = document.querySelector(".current-temperature-value");
  temperatureElement.innerHTML = temperatureCurrent;

  // Muestra un mensaje adicional sobre la ciudad y el clima (opcional)
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = `${response.data.city}`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);
