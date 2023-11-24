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
      const noteFromServer = await fetch(`/api/notes/${id}/`);
      const data = await noteFromServer.json();
      setNote(data);
    };

    getNote();
  }, [id]);

  const updateNote = async () => {
    await fetch(`/api/notes/${id}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  const handleSubmit = () => {
    updateNote();
    navigate("/");
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
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
