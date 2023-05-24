import React from "react";
import Slide from "@mui/material/Slide";

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

export default Stops;
