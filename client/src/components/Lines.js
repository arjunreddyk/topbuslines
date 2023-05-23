import React from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import Paper from "@mui/material/Paper";

const Lines = ({ lineNumber, expand }) => {
  return (
    <>
      <Paper elevation={4} square className="paper">
        <DirectionsBusIcon className="icon" /> {lineNumber[0]}
        <small> has </small> {lineNumber[1]} <small>stops</small>
        {expand ? (
          <ExpandLess className="icon" />
        ) : (
          <ExpandMore className="icon" />
        )}
      </Paper>
    </>
  );
};

export default Lines;
