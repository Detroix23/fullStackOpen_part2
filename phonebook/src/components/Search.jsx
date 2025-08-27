import { useState } from "react";

import PersonsList from "./Persons";

const Search = ({ persons }) => {
  const [ search, setSearch ] = useState('');
  
  const onSearch = (event) => {
    setSearch(event.target.value);
    console.log(`Comp.Search - Search: ${event.target.value} (${search}).`);
  }

  const onSearchSubmit = (event) => {
    event.preventDefault();
  }
  // Filter by search, only if search if not empty string.
  let personsFiltered = []
  if (search !== '') {
    personsFiltered = persons.filter((person) => person.name.toLowerCase().includes(search.toLowerCase()));
    console.log(`Searched with: ${search}, found:`, personsFiltered);
  } else {
    console.log(`Empty search (${search}).`);
  }
  

  return (
    <div>
      <form onSubmit={onSearchSubmit}>
        By name:
        <input type="text" onChange={onSearch} />
      </form>
      <PersonsList persons={personsFiltered} />
    </div>
  );
};


export default Search;