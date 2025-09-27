import { useEffect, useState } from 'react';

import personsService from './services/persons';

import PersonsList from './components/Persons';
import Search from './components/Search';
import PersonForm from './components/PersonForm';

const BannerSuccess = ({ message }) => {
  const bannerStyle = {
    color: "green",
    background: "lightgray",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };
  if (message !== null) {
    return (
      <div style={bannerStyle}>
        {message}
      </div>
    );
  }
}

const App = () => {
  // Vars.
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState(null);
  const [ successMessage, setSuccessMessage ] = useState(null);

  // Get the persons and number from the server.
  useEffect(() => {
    personsService
      .getAll()
      .then(personsInitial => {
        console.log(`Persons - Received l: ${personsInitial.length}, data:`, personsInitial);
        setPersons(personsInitial);
      });
  }, []);

  // Messages
  const setBannerSuccess = (message, duration) => {
    console.log(`set: ${message}`);
    
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
      console.log(`set: null after ${duration}ms.`);
      
    }, duration);
  };

  // Form
  const addPersonToPhonebook = (event) => {
    event.preventDefault();
    const personNames = persons.map((person) => person.name);
    const personAlreadyExists = personNames.includes(newName);

    // Add the person (or not if invalid entry).
    if (newName === '') {
      console.log(`Form.addPerson - Empty string (${newName}).`);

    // Replace.
    } else if (personAlreadyExists) {
      const replaceConfirmed = window.confirm(`'${newName}' is already in the phonebook. Replace the number with ${newNumber}?`);
      if (replaceConfirmed) {
        console.log(`Form.addPerson - Replacing (${newName}).`);
        const id = persons.find(person => person.name === newName).id;
        const newPerson = {
          name: newName,
          number: newNumber
        };
        let updateResponse = personsService
          .updatePerson(id, newPerson)
          .then(personReturned => {
            let newPersons = persons.map(person => person.id !== id
              ? person
              : personReturned
            )
            newPerson = newPerson.filter(person => person !== undefined);

            setPersons(newPerson);
          })
          .catch(() => {
            console.log(`Person is deleted: id ${id}.`)
            setPersons(persons.filter(person => person.id !== id));
          });
        
        setTimeout(() => console.log('updateResponse:', updateResponse));
        
        setBannerSuccess(`Succefully modified ${newPerson.name}'s number to ${newPerson.number}.`, 5000);
      }
    // Add.
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

      setBannerSuccess(`Succefully added person ${newPerson.name} at ${newPerson.number}.`, 5000);
    }
    setNewName('');
    setNewNumber('');
  };

  const onDeletePerson = (id) => {
    const deleteConfirmed = window.confirm(`Do you really want to delete '${persons.find(person => person.id === id).name}'?`);
    if (deleteConfirmed) {
      personsService.deletePerson(id);
      setPersons(persons.filter(person => person.id !== id));
    }    
  };


  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  };


  return (
    <div>
      <h1>Phonebook</h1>

      <BannerSuccess message={successMessage} />

      <h2>Search</h2>
      <Search persons={persons} />

      <h2>Add people.</h2>
      <i>Replace by entering an already entered name.</i>
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