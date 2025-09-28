import { useEffect, useState } from "react";
import axios from 'axios';

const Search = ({ onSearch, handleChange }) => {
  return (
    <form onSubmit={onSearch} >
      <input type="text" onChange={handleChange} placeholder="Search countries."/>
    </form>
  );
};

const SearchResult = ({ searchValue, countriesName }) => {
  if (!searchValue) {
    return (
      <>
        <p>...</p>
      </>
    );
  } else {
    const similarNames = countriesName.filter(name => name
      .toLowerCase()
      .startsWith(
        searchValue.toLowerCase()
      )
    );
    
    console.log('SearchResult - similarNames:', similarNames);

    if (similarNames.length == 0) {
      return (
        <>
          <p>No country matching this name.</p>
        </>
      );
    } else if (similarNames.length == 1) {
      const foundName = similarNames[0];
      return (
        <>
          <h1>{foundName}</h1>
        </>
      )
    } else {
      return (
        <ul>
          <li key="countriesName-t" ><b>Countries</b></li>
          {similarNames.map((country, index) => (
              <li key={`countriesName-${index}`}>
                {country}
              </li>
            )
          )}
        </ul>
      );
    }

  }
};

/*
 * This app allow to get info about countries around the globe.
 * It uses the API: https://studies.cs.helsinki.fi/restcountries/.
 */
const App = () => {
  // Variables.
  const [ searchValue, setSearchValue ] = useState(null);
  // All the availbe countries, for the global search.
  const [ countriesName, setCountriesName ] = useState([]);

  // Getting all countries name.
  useEffect(() => {
    console.log('useEffect - countries name.');
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


  // Handlers.
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    console.log(`Search: ${event.target.value}`);
  };

  const onSearch = (event) => {
    event.preventDefault();
  };


  return (
    <>
      <h1>Countries info.</h1>
      <Search onSearch={onSearch} handleChange={handleSearchChange} />
      <SearchResult searchValue={searchValue} countriesName={countriesName} />
    </>
  );
};

export default App;
