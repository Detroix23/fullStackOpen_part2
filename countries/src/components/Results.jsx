// components/Results.jsx

const SearchError = ({ message }) => <p>{message}</p>

const Flag = ({ source, width, alt }) => <img src={source} width={width} alt={alt} />

const FoundMultiple = ({ similarNames }) => (
  <ul>
    {similarNames.map((country, index) => (
        <li key={`countriesName-${index}`}>
          {country}
        </li>
      )
    )}
  </ul>
)

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

  console.log("Results.FoundCountry - Lang", data.languages);
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
      <ul>
        {Object.entries(data.languages).map(([ code, name ]) => (
          <li key={code}>
            {name}
          </li>
        ))}
      </ul>

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