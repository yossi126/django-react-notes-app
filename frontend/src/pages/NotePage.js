import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";

import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
const NotePage = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    const getNote = async () => {
      if (id === "new") return;
      const noteFromServer = await fetch(`/api/notes/${id}/`);
      const data = await noteFromServer.json();
      setNote(data);
    };

    getNote();
  }, [id]);

  const updateNote = async () => {
    if (id === "new") return;
    await fetch(`/api/notes/${id}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  const createNote = async () => {
    await fetch(`/api/notes/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  const handleSubmit = () => {
    if (id !== "new" && !note.body) {
      deleteNote();
    } else if (id !== "new") {
      updateNote();
      navigate("/");
    } else if (id === "new" && note !== null) {
      createNote();
      navigate("/");
    }
  };

  const deleteNote = async () => {
    await fetch(`/api/notes/${id}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/");
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        defaultValue={note?.body}
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
      ></textarea>
    </div>
  );
};

export default NotePage;
