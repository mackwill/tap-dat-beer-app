import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";

export default function EmptyTextarea(props) {
  return (
    <>
      <Box p={"1rem"}>
        <Button variant="contained" fullWidth onClick={props.saveNote}>
          <SaveIcon />
        </Button>
      </Box>
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
