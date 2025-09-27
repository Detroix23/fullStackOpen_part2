import { useState, useEffect } from 'react';
import axios from 'axios';

import noteService from './services/notes';
import Note from './components/Note';

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className='error-message'>
      {message}
    </div>
  );
}

const App = () => {
  const [ notes, setNotes ] = useState([]);
  const [ newNote, setNewNote ] = useState("");
  const [ showAll, setShowAll ] = useState(true);
  const [ errorMessage, setErrorMessage ] = useState('(X) - First fake error.');

  // Receiving notes from JSON server.
  useEffect(() => {
    console.log("Effect - start");
    noteService
      .getAll()
      .then((notes_initial) => {
        console.log("Effect - Received notes:", notes_initial);
        setNotes(notes_initial);
      });
  }, []);
  // console.log(`Effect - Notes length: ${notes.length}`);

  // Handlers.
  const handleNoteAdd = (event) => {
    event.preventDefault();
    if (newNote !== "") {
      const note_added = {
        content: newNote,
        important: Math.random() > 0.5,
        // id: String(notes.length + 1),
      }
      console.log(`Comp.NoteAddForm - Adding note ${newNote}:`, note_added);
      // Pushing note to the server.
      noteService
        .create(note_added)
        .then((note_returned) => {
          setNotes(notes.concat(note_returned));
          setNewNote('');
        });
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
  
  const toggleImportanceOf = (id) => {
    console.log(`Toggle importance - Id: ${id}.`);
    const note = notes.find((n) => n.id === id);
    const note_next = { ...note, important: !note.important};

    noteService
      .update(id, note_next)
      .then((note_returned) => {
        setNotes(notes.map((note) => note.id === id 
          ? note_returned
          : note 
        ));
      })
      .catch(errorReceived => {
        setErrorMessage(
          `Note '${note.content}' was already removed.`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000)
      });
  }

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={switchNoteShow}>
          Show {showAll ? 'important only' : 'all'}.
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
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
