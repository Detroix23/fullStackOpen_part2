
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

export default PersonsList;