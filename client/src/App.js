import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Error from "./components/Error";
import Lines from "./components/Lines";
import Stops from "./components/Stops";
import Loader from "./components/Loader";
import "./App.css";

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
          <Typography variant="h4" gutterBottom fontWeight={200}>
            TOP TEN BUS LINES
          </Typography>
          {isError && <Error message={isError} />}
          {topLines &&
            topLines.map((lineNumber, i) => {
              return (
                <div key={i}>
                  <Box
                    my={2}
                    className="lineNumber"
                    onClick={() =>
                      setIsOpen((preState) => ({
                        ...preState,
                        [i]: !preState[i],
                      }))
                    }
                  >
                    <Lines lineNumber={lineNumber} expand={isOpen[i]} />
                  </Box>

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
