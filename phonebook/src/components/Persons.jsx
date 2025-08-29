
const Person = ({ name, number }) => (
  <>
    <td>{name}</td>
    <td>{number === '' ? "none" : number}</td>
  </>
);

const PersonDelete = ({ id, handleDeletePerson }) => {
  return (
    <td>
      <button onClick={() => handleDeletePerson(id)}>
        Delete
      </button>
    </td>
  );
}

const PersonsList = ({ persons, onDeletePerson }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Number</th>
        </tr>
      </thead>
      <tbody>
        {persons.map((person) => 
          <tr key={person.id}>
            <Person 
              name={person.name} 
              number={person.number}
            />
            <PersonDelete id={person.id} handleDeletePerson={onDeletePerson}/>
          </tr>
        )}  
      </tbody>
    </table>
  );
}

export default PersonsList;