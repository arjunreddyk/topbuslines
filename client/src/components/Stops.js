import React from 'react';
import PropTypes from 'prop-types';
import Slide from '@mui/material/Slide';

const Stops = ({ stops, expand }) => {
  return (
    <Slide
      direction="right"
      in={expand}
      mountOnEnter
      unmountOnExit
      timeout={300}
    >
      <ul>
        {stops.map((stop, i) => (
          <li key={i} data-testid="stop-names">
            {stop.stopName}
          </li>
        ))}
      </ul>
    </Slide>
  );
};

Stops.propTypes = {
  expand: PropTypes.bool,
  stops:  PropTypes.array
};
export default Stops;
