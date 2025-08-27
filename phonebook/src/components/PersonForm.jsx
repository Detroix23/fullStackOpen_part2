
const Field = ({ text, onChange }) => (
  <div>
    {text}: 
    <input type="text" onChange={onChange} />
  </div>
);

const PersonForm = ({ addPersonToPhonebook, handleNameInput, handleNumberInput }) => {
  return (
    <form onSubmit={addPersonToPhonebook} >
      <Field text={"name"} onChange={handleNameInput} />
      <Field text={"number"} onChange={handleNumberInput} />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default PersonForm;