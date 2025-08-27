import { useState } from 'react';

import PersonsList from './components/Persons';
import Search from './components/Search';
import PersonForm from './components/PersonForm';

const App = () => {
  // Vars
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '00-00-0000001', id: 0 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');

  // Form
  const addPersonToPhonebook = (event) => {
    event.preventDefault();

    const personNames = persons.map((person) => person.name); 
    
    const personAlreadyExists = personNames.includes(newName);

    // Add the person (or not if invalid entry).
    if (newName === '') {
      console.log(`Form.addPerson - Empty string (${newName}).`);
    } else if (personAlreadyExists) {
      console.log(`Form.addPerson - Already in (${newName})`);
      window.alert(`'${newName}' is already in the phonebook.`);
    } else {
      const id = persons[persons.length - 1].id + 1;
      console.log(`Form.addPerson - Person: ${newName}, id: ${id}`);
      const persons_new = persons.concat(
        {
          name: newName,
          number: newNumber,
          id: id
        }
      );
      setPersons(persons_new);
    }
  };
  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <h2>Search</h2>
      <Search persons={persons} />

      <h2>Add people.</h2>
      <PersonForm 
        addPersonToPhonebook={addPersonToPhonebook}
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
      />
      
      <h2>Numbers.</h2>
      <PersonsList persons={persons} />
    </div>
  );
};

export default App;