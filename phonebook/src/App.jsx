import { useState } from 'react';

const Person = ({ name }) => <li>{name}</li>

const PersonsList = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => 
        <Person key={person.id} name={person.name} />
      )}  
    </ul>
  );
}

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas', 
      id: 0
    }
  ]);
  const [newName, setNewName] = useState('');

  const addPersonToPhonebook = (event) => {
    event.preventDefault();

    const personNames = persons.map((person) => person.name); 
    const personAlreadyExists = personNames.includes(newName);
    console.log(personAlreadyExists);

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
          id: id
        }
      );
      setPersons(persons_new);
    }
  };

  const handlePersonInput = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPersonToPhonebook} >
        <div>
          name: 
          <input type="text" onChange={handlePersonInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PersonsList persons={persons} />
    </div>
  );
};

export default App;