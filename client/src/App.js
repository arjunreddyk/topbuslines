import { useCallback, useState, useEffect } from "react";
import "./App.css";
import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import TrainIcon from "@mui/icons-material/Train";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";

function App() {
  const [lines, setLines] = useState({});
  const [isOpen, setIsOpen] = useState(Array(10).fill(false));

  useEffect(() => {
    fetch(`/api/lines`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLines(data);
        window.data = data;
      });
  }, []);

  const { topTenLines, pickTopTenLines } = lines;

  return (
    <>
      <h3>TOP TEN BUS LINES</h3>
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
                  pickTopTenLines[lineNumber[0]].map((stop) => (
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
