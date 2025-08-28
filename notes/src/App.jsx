import { useState, useEffect } from 'react';
import axios from 'axios';

import Note from './components/Note';

const App = () => {
  const [ notes, setNotes ] = useState([]);
  const [ newNote, setNewNote ] = useState("");
  const [ showAll, setShowAll ] = useState(true);

  useEffect(() => {
    console.log("Effect - start");
    axios
    .get('http://localhost:3001/notes')
    .then((response) => {
      console.log("Effect - Received notes:", response.data);
      setNotes(response.data);
    });
  }, []);
  console.log(`Effect - Notes length: ${notes.length}`);

  // Handlers
  const handleNoteAdd = (event) => {
    event.preventDefault();
    if (newNote !== "") {
      const note_added = {
        content: newNote,
        important: Math.random() > 0.5,
        id: String(notes.length + 1),
      }
      console.log(`Comp.NoteAddForm - Adding note ${newNote}:`, note_added);
      
      setNotes(notes.concat(note_added));
    } else {
      console.log(`Comp.NoteAddForm - Note adding, empty note (${newNote}).`);
    }
    setNewNote('');
  }

  const handleNoteChange = (event) => {
    console.log(`Comp.NoteAddForm - Changing: ${event.target.value}`);
    setNewNote(event.target.value);
  }

  const switchNoteShow = () => setShowAll(!showAll);

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={switchNoteShow}>
          Show {showAll ? 'important only' : 'all'}.
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={handleNoteAdd}>
        <input 
          type="text" 
          value={newNote} 
          onChange={handleNoteChange}
        />
        <button type="submit">
          Save.
        </button>
      </form>
    </div>
  );
};

export default App;
