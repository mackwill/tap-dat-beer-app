import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Notes from "./Notes";
import axios from "axios";

import SimilarBeer_v2 from "./SimilarBeer_v2";
import UserReviews from "./UserReviews";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function UnderBeer(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [similarBeers, setSimilarBeers] = useState([]);
  const [personalNotes, setPersonalNotes] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePersonalNotes = (e) => {
    setPersonalNotes(e.target.value);
  };

  const saveNote = async () => {
    const notes = { text: personalNotes, beer_id: props.currentBeer.id };
    await axios.post("/api/notes", notes);
    props.setOpenSB("Your note was saved");
  };

  const getNote = async () => {
    const id = props.currentBeer.id;
    const note = await axios.get(`/api/notes/${id}`);

    if (!note.data.data) {
      setPersonalNotes("");
    } else {
      setPersonalNotes(note.data.data.text);
    }
  };

  // Update similar beer list when a user clicks on
  // a beer in the similar list tab
  const updateSimilarBeers = async () => {
    const beers = await axios.get(`/api/beers/similar/${props.currentBeer.id}`);
    setSimilarBeers(beers.data.data);
  };

  useEffect(() => {
    updateSimilarBeers();
    getNote();
  }, [props.currentBeer]);

  return (
    <div className={classes.root} style={{ backgroundColor: "#f0f0f0" }}>
      <AppBar style={{ borderRadius: "5px" }} position="static">
        <Tabs centered value={value} onChange={handleChange}>
          <Tab label="Reviews" />
          <Tab label="Similar Beers" />
          {props.currentUser && <Tab label="Notepad" />}
          {!props.currentUser && <Tab label="Notepad" disabled />}
        </Tabs>
      </AppBar>
      {value === 0 && <UserReviews reviews={props.reviews} />}
      {value === 1 && (
        <SimilarBeer_v2
          onClick={props.onClick}
          beers={props.beers}
          currentBeer={props.currentBeer}
          similarBeers={similarBeers}
        />
      )}
      {value === 2 && (
        <Notes
          currentBeer={props.currentBeer}
          userNote={props.userNote}
          handlePersonalNotes={handlePersonalNotes}
          saveNote={saveNote}
          personalNotes={personalNotes}
        />
      )}
    </div>
  );
}
