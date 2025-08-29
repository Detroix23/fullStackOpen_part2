const Note = ({ note, toggleImportance }) => {
  const button_label = note.important
    ? "Unstar"
    : "Star";

  return (
    <li>
      <button onClick={toggleImportance}>
        {button_label}
      </button>
      <span> {note.content}</span>
    </li>
  );
}

export default Note;
