import { useCallback, useState, useEffect } from "react";
import "./App.css";
import * as React from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

function App() {
  const [lines, setLines] = useState({});
  const [isOpen, setIsOpen] = useState(Array(10).fill(false));
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    fetch(`/api/lines`)
      .then((response) => response.json())
      .then((data) => {
        setLines(data);
        if (data.error) {
          setIsError(data.error);
        }
      })
      .catch((error) => {
        setIsError(error);
      });
  }, []);

  const { topTenLines, linesWithStops } = lines;
  return (
    <>
      <h3>TOP TEN BUS LINES</h3>
      {isError && <p>{isError.Message}</p>}
      {topTenLines &&
        topTenLines.map((lineNumber, i) => {
          return (
            <>
              <p
                className="lineNumber"
                onClick={() =>
                  setIsOpen((preState) => ({
                    ...preState,
                    [i]: !preState[i],
                  }))
                }
              >
                <>
                  <DirectionsBusIcon className="icon" /> {lineNumber[0]}
                  <small> has </small>
                  {lineNumber[1]} <small>stops</small>
                </>
                {isOpen[i] ? (
                  <ExpandLess className="icon" />
                ) : (
                  <ExpandMore className="icon" />
                )}
              </p>
              <ul className={isOpen[i] ? "slide" : undefined}>
                {isOpen[i] &&
                  linesWithStops[lineNumber[0]].map((stop) => (
                    <li>{stop.StopPointName}</li>
                  ))}
              </ul>
            </>
          );
        })}
    </>
  );
}

export default App;
