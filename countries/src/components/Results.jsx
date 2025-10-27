// components/Results.jsx

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

const FoundCountry = ({ name, data }) => {
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
      <h1>{name}</h1>

      <h2>Geography</h2>
      <ul>
        <li>Capital: {data.capital[0]}</li>
        <li>Area: {data.area}</li>
      </ul>

      <h2>Languages</h2>
      <Languages languages={data.languages} />

      <h2>Flag</h2>
      <Flag 
        source={imageSource} 
        width={500}
        alt={data.flags.alt}
      />

    </>
  )
}


export { SearchError, FoundMultiple, FoundCountry };