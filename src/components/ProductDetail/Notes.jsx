import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import ListSubheader from "@material-ui/core/ListSubheader";

export default function EmptyTextarea(props) {
  return (
    <>
      <ListSubheader component="div" style={{ backgroundColor: "#f0f0f0" }}>
        Personal notes about {props.currentBeer.name}
      </ListSubheader>
      <Box pb={"1rem"} style={{ backgroundColor: "#f0f0f0" }}>
        <Button variant="contained" fullWidth onClick={props.saveNote}>
          Save Notes
        </Button>
      </Box>
      <TextareaAutosize
        style={{ width: "100%", height: "40vw" }}
        aria-label="empty textarea"
        placeholder="This beer is ..."
        value={props.personalNotes}
        onChange={props.handlePersonalNotes}
      />
    </>
  );
}
