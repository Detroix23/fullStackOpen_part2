import { useState } from 'react';

const Person = ({ name, number }) => (
  <tr>
    <td>{name}</td>
    <td>{number}</td>
  </tr>
);

const PersonsList = ({ persons }) => {
  return (
    <table>
      <tbody>
        {persons.map((person) => 
          <Person key={person.id} name={person.name} number={person.number}/>
        )}  
      </tbody>
    </table>
  );
}

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '00-00-0000001',
      id: 0,
    }
  ]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');

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
      <h2>Phonebook</h2>
      <form onSubmit={addPersonToPhonebook} >
        <div>
          name: 
          <input type="text" onChange={handleNameInput} />
        </div>
        <div>
          number:
          <input type="text" onChange={handleNumberInput} />
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