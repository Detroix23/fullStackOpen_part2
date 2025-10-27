// services/weather.js
import axios from "axios";


// Read key from the `environment variable` VITE_KEY_OPENWEATHER.
const KEY_OPENWEATHER = import.meta.env.VITE_KEY_OPENWEATHER;
if (!KEY_OPENWEATHER) {
  console.log("services.weather - WARNING Empty OpenWeather Key !")
}

const URL_OPENWEATHER_API = "https://api.openweathermap.org/data/2.5/";
const URL_OPENWEATHER = "https://openweathermap.org/";

/*
 * Get weather from OpenWeatherMap, using the provided API key.
 * `units` can 'metric' or 'imperial'.
 * Returns: 
 */
const getWeather = (latitude, longitude, units) => {
  // Prevent useless calls.
  if ((!latitude && !longitude) || !KEY_OPENWEATHER) {
    return false;
  }
  const request = axios
    .get(`${URL_OPENWEATHER_API}weather?lat=${latitude}&lon=${longitude}&appid=${KEY_OPENWEATHER}&units=${units}`);
  
  return request.then(response => response.data)
}

/*
 * Return the exact URL for the given icon code.
 */
const getIcon = (iconCode, size) => {
  if (!size) {
    size = 1;
  } 
  return `${URL_OPENWEATHER}/img/wn/${iconCode}@${size}x.png`;
}

export default { getWeather, getIcon };
