const Note = ({ note, toggleImportance }) => {
  const noteStyle = {
    color: 'blue',
    fontStyle: 'italic'
  };
  
  const button_label = note.important
    ? "Unstar"
    : "Star";

  return (
    <li style={noteStyle}>
      <button onClick={toggleImportance}>
        {button_label}
      </button>
      <span> {note.content}</span>
    </li>
  );
}

export default Note;
