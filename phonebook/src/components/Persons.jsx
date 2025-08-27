
const Person = ({ name, number }) => (
  <tr>
    <td>{name}</td>
    <td>{number === '' ? "none" : number}</td>
  </tr>
);

const PersonsList = ({ persons }) => {
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
          <Person key={person.id} name={person.name} number={person.number}/>
        )}  
      </tbody>
    </table>
  );
}

export default PersonsList;