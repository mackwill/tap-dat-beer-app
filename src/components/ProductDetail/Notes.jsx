import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";

export default function EmptyTextarea(props) {
  return (
    <>
      <Button variant="contained" fullWidth onClick={props.saveNote}>
        <SaveIcon />
      </Button>
      <TextareaAutosize
        style={{ width: "100%", height: "100vw" }}
        aria-label="empty textarea"
        placeholder="Empty"
        value={props.personalNotes}
        onChange={props.handlePersonalNotes}
      />
    </>
  );
}
