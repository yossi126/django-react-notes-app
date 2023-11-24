import React, { useState, useEffect } from "react";
import ListItem from "../components/ListItem";

const NoteListPage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const response = await fetch("/api/notes/");
    const data = await response.json();
    setNotes(data);
    // console.log(data);
  };

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>
      <div className="notes-list">
        {notes.map((note) => (
          <ListItem note={note} key={note.id} />
        ))}
      </div>
    </div>
  );
};

export default NoteListPage;
