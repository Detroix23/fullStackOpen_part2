import { useEffect, useState } from "react";
import axios from 'axios';

import { Search, SearchResult } from './components/Search';
import searchService from './services/search';


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


  // Getting all countries name.
  useEffect(() => {
    console.log('useEffect: countries name.');
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountriesName(response.data.map(
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
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${foundName}`)
        .then(response => {setFoundCountry(response.data)})
        .catch(() => {
          console.log(`useEffect: precise country - Error getting country ${foundName}.`);
        })
    }
  }, [foundName]);

  // Handlers.
  const handleSearchChange = (event) => {
    const search = event.target.value;
    setSearchValue(search);
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
      />
    </>
  );
};

export default App;
