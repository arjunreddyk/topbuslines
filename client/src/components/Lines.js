import React from 'react';
import PropTypes from 'prop-types';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import Paper from '@mui/material/Paper';

const Lines = ({ lineNumber, expand }) => {
  return (
    <>
      <Paper elevation={4} square className="paper">
        <span className="float-left">
          {expand ? (
            <ExpandLess className="icon" />
          ) : (
            <ExpandMore className="icon" />
          )}
          <DirectionsBusIcon className="icon" /> {lineNumber[0]}
        </span>
        <span className="float">
          {lineNumber[1]} <small>stops</small>
        </span>
      </Paper>
    </>
  );
};

Lines.propTypes = {
  expand: PropTypes.bool,
  lineNumber:  PropTypes.array
};


export default Lines;
