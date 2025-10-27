// components/Search.jsx

import { SearchError, FoundMultiple, FoundCountry } from "./Results";

const Search = ({ onSearch, handleChange }) => {
  return (
    <form onSubmit={onSearch} >
      <input type="text" onChange={handleChange} placeholder="Search countries."/>
    </form>
  );
};

/*
  * Search result.
  * Can be 5 state:
  *  - No search,
  *  - Countries matching search,
  *  - Too many countries matching,
  *  - No countries matching,
  *  - Displaying info of a found country.
  */
const SearchResult = ({ 
  similarNames,
  foundCountry,
  foundName,
  setFoundName,
}) => {
  // Nothing matches.
  if (similarNames.length == 0) {
    return <SearchError message={"No matches."} />;
  }

  // One match: we found the country.
  else if (foundName !== null) {
    console.log(`Search.SearchResult - foundName: ${foundName} similarNames:`, similarNames);
    return <FoundCountry 
      name={foundName} 
      data={foundCountry} 
    />
  }

  // Too many matches.
  else if (similarNames.length > 10) {
    return <SearchError message={`Too many matches (${similarNames.length}).`}/>
  }

  // Some matches.
  return <FoundMultiple 
    similarNames={similarNames}
    setFoundName={setFoundName}
  />;
};

export { Search, SearchResult };
