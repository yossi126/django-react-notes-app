import React, { useState, useEffect } from "react";
import ListItem from "../components/ListItem";

const NoteListPage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/notes/");
    const data = await response.json();
    setNotes(data);
    // console.log(data);
  };

  return (
    <div>
      <div className="notes-list">
        {notes.map((note) => (
          <ListItem note={note} key={note.id} />
        ))}
      </div>
    </div>
  );
};

export default NoteListPage;
