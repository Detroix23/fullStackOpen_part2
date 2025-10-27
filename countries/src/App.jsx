import { useEffect, useState } from "react";

import countriesService from './services/countries';
import searchService from './services/search';
import weatherService from './services/weather';
import { Search, SearchResult } from './components/Search';


/*
 * This app allow to get info about countries around the globe.
 * It uses the API: https://studies.cs.helsinki.fi/restcountries/.
 */
const App = () => {
  // Variables.
  const [ searchValue, setSearchValue ] = useState(null);
  // All the availbe countries, for the global search.
  const [ countriesName, setCountriesName ] = useState([]);
  const [ countriesFiltered, setCountriesFiltered ] = useState([]);
  // Found a precise country.
  const [ foundCountry, setFoundCountry ] = useState(null);
  const [ foundName, setFoundName ] = useState(null);
  // Weather.
  const [ weather, setWeather ] = useState(null);  

  // Getting all countries name.
  useEffect(() => {
    console.log('useEffect: countries name.');
    countriesService
      .getAll()
      .then(data => {
        setCountriesName(data.map(
          country => country.name.common
        ));
        console.log('New countries name:', countriesName);
      })
      .catch(() => {
        console.log('useEffect.countriesName - Error getting data.');
      });

  }, []);

  // Getting precise info for the found country.
  useEffect(() => {
    if (foundName) {
      console.log(`useEffect: precise country (${foundName}).`);
      countriesService
        .getName(foundName)
        .then(data => {setFoundCountry(data)})
        .catch(() => {
          console.log(`useEffect: precise country - Error getting country ${foundName}.`);
        })
    }
  }, [foundName]);

  // Getting weather.
  useEffect(() => {
    if (foundCountry) {
      const cordinates = {
        latitude: foundCountry.capitalInfo.latlng[0],
        longitude: foundCountry.capitalInfo.latlng[1],
      };

      const units = 'metric';

      console.log(`useEffect: weather (${foundName})`);
      const weatherRequest = weatherService.getWeather(cordinates.latitude, cordinates.longitude, units);

      if (weatherRequest) {
        weatherRequest
          .then(data => {
            console.log(`useEffect: Weather - Then got:`, data);
            setWeather(data);
          })
          .catch(() => {
            console.log(`useEffect: Weather - Error getting.`);
            setWeather(null);
          })
      } else {
        console.log(`useEffect: Weather - Request empty.`);
        setWeather(null);
      }
    }
  }, [foundCountry]);


  // Handlers.
  const handleSearchChange = (event) => {
    const search = event.target.value;
    setSearchValue(search);

    console.log("---------------------------\n ");
    console.log(`App.handleSearchChange - Search: ${search}`);

    const newCountries = searchService.filter_countries(countriesName, search);
    setCountriesFiltered(newCountries);

    console.log("App.handleSearchChange - And found:", newCountries);

    const currentFoundName = newCountries.length == 1 
      ? newCountries[0]
      : null;

    setFoundName(currentFoundName);

    console.log(`App.handleSearchChange - Found country: ${currentFoundName}, data:`, foundCountry);
  };

  const onSearch = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <h1>Countries info.</h1>
      <Search 
        onSearch={onSearch} 
        handleChange={handleSearchChange} />
      <SearchResult 
        similarNames={countriesFiltered}
        foundCountry={foundCountry}
        foundName={foundName}
        setFoundName={setFoundName}
        weather={weather}
      />
    </>
  );
};

export default App;
