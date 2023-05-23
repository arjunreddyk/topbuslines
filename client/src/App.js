import { useCallback, useState, useEffect } from "react";
import "./App.css";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Error from "./components/Error";
import Lines from "./components/Lines";
import Stops from "./components/Stops";
import Loader from "./components/Loader";

function App() {
  const [lines, setLines] = useState({});
  const [isOpen, setIsOpen] = useState(Array(10).fill(false));
  const [isError, setIsError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
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
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  const { topLines, linesWithStops } = lines;
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={3}>
        <div>
          <h3>TOP TEN BUS LINES</h3>
          {isError && <Error message={isError} />}
          {topLines &&
            topLines.map((lineNumber, i) => {
              return (
                <div key={i}>
                  <p
                    className="lineNumber"
                    onClick={() =>
                      setIsOpen((preState) => ({
                        ...preState,
                        [i]: !preState[i],
                      }))
                    }
                  >
                    <Lines lineNumber={lineNumber} expand={isOpen[i]} />
                  </p>

                  <Stops
                    stops={linesWithStops[lineNumber[0]]}
                    expand={isOpen[i]}
                  />
                </div>
              );
            })}
        </div>
      </Grid>
    </Grid>
  );
}

export default App;
