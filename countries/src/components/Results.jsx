// components/Results.jsx

import weatherService from '../services/weather';


const SearchError = ({ message }) => <p>{message}</p>

const Flag = ({ source, width, alt }) => <img src={source} width={width} alt={alt} />

const CountrySelecter = ({ name, setFoundName }) => {
  const handleClick = (name) => () => {
    console.log(`Results.CountrySelecter - Set to ${name}.`);
    return setFoundName(name);
  }

  return (
    <button onClick={handleClick(name)} style={{marginLeft: "10px"}}>
      Show
    </button>
  );
}

const CountryWeather = ({ data }) => {  
  if (!data) {
    console.log(`Results.CountryWeather - Empty.`, data);
    return <p>No weather...</p>
  }
  if (!Object.hasOwn(data, 'main')) {
    console.log(`Results.CountryWeather - Not correct type.`, data);
    return <p>No weather...</p>
  }

  console.log(`Results.CountryWeather - Getting meteo: `, data);

  const units = 'metric';
  const scale = 2;
  const size = 200;

  return (
    <>
      <p>Temparature: {data.main.temp}°{units === 'imperial' ? 'F' : 'C'}.</p>
      <img 
        src={weatherService.getIcon(data.weather[0].icon, scale)} 
        width={`${size}px`} 
        alt={`${data.weather[0].main}. Image describing the current weather, ${data.weather[0].description}`}
      />
      <p>Wind: {data.wind.speed}m/s.</p>    
    </>
  );
}

const FoundMultiple = ({ similarNames, setFoundName }) => (
  <ul>
    {similarNames.map((country, index) => (
        <li key={`countriesName-${index}`}>
          {country} 
          <CountrySelecter
            name={country}
            setFoundName={setFoundName}
          />
        </li>
      )
    )}
  </ul>
)

const Languages = ({ languages }) => {
  console.log(`Results.Languages - Provided:`, languages);

  return (
    <ul>
      {Object.entries(languages).map(([ code, name ]) => (
        <li key={`countryLanguage-${code}`}>
          {name}
        </li>
      ))}
    </ul>
  )
};

const FoundCountry = ({ name, data, weather }) => {
  const use_png = false
  console.log(`Results.FoundCountry - Displaying found country of ${name}:`, data);
  
  if (!data) {
    return (
      <>
        <h1>{name}</h1>
        <p>Loading</p>
      </>
    )
  }

  const imageSource = use_png
    ? data.flags.png
    : data.flags.svg;

  return (
    <>
      <h1>{name}.</h1>

      <h2>Geography.</h2>
      <ul>
        <li>Capital: {data.capital[0]}</li>
        <li>Area: {data.area}km²</li>
      </ul>

      <h2>Languages.</h2>
      <Languages languages={data.languages} />

      <h2>Flag.</h2>
      <Flag 
        source={imageSource} 
        width={500}
        alt={data.flags.alt}
      />

      <h2>Weather.</h2>
      <CountryWeather 
        data={weather}
      />

    </>
  )
}


export { SearchError, FoundMultiple, FoundCountry };