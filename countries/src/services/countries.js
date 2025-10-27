// services/countries.js

import axios from "axios";

const COUNTRIES_URL = "https://studies.cs.helsinki.fi/restcountries/api/";

const getName = (name) => {
  const request = axios.get(COUNTRIES_URL + 'name/' + name);
  return request.then(response => response.data);
};

const getAll = () => {
  const request = axios.get(COUNTRIES_URL + 'all');
  return request.then(response => response.data);
};

export default { getName, getAll };
