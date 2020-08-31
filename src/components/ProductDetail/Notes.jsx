import React, { useState } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import Axios from "axios";

export default function EmptyTextarea(props) {
  const [personalNotes, setPersonalNotes] = useState("");
  const handlePersonalNotes = (e) => {
    setPersonalNotes(e.target.value);
  };
  const saveNote = () => {
    const notes = { text: personalNotes, beer_id: props.currentBeer.id };
    return Axios.post("/notes", notes)
      .then((data) => console.log("Got the data back"))
      .catch((e) => null);
  };
  return (
    <>
      <Button variant="contained" fullWidth onClick={saveNote}>
        <SaveIcon />
      </Button>
      <TextareaAutosize
        style={{ width: "100%", height: "100vw" }}
        aria-label="empty textarea"
        placeholder="Empty"
        value={personalNotes}
        onChange={handlePersonalNotes}
      />
    </>
  );
}
