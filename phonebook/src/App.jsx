import { useEffect, useState } from 'react';

import personsService from './services/persons';

import PersonsList from './components/Persons';
import Search from './components/Search';
import PersonForm from './components/PersonForm';

const App = () => {
  // Vars.
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  // Get the persons and number from the server.
  useEffect(() => {
    personsService
      .getAll()
      .then(persons_initial => {
        console.log(`Persons - Received l: ${persons_initial.length}, data:`, persons_initial);
        setPersons(persons_initial);
      });
  }, []);

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
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      // Push to the server.
      personsService
        .create(newPerson)
        .then(personReturned => {
          setPersons(persons.concat(personReturned));
        });
    }
    setNewName('');
    setNewNumber('');
  };
  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  }
  const onDeletePerson = (id) => {
    const deleteConfirmed = window.confirm(`Do you really want to delete '${persons.find(person => person.id === id).name}'?`);
    if (deleteConfirmed) {
      personsService.deletePerson(id);
      setPersons(persons.filter(person => person.id !== id));
    }    
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
      <PersonsList 
        persons={persons} 
        onDeletePerson={onDeletePerson}
      />
    </div>
  );
};

export default App;