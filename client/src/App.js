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
import { FixedSizeList } from "react-window";

function App() {
  const [lines, setLines] = useState({});
  const [isOpen, setIsOpen] = useState(Array(10).fill(false));

  useEffect(() => {
    fetch(`/lines`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLines(data);
        window.data = data;
      });
  }, []);

  const { topTenLines, pickTopTenLines } = lines;

  if (topTenLines) {
    return topTenLines.map((lineNumber, i) => {
      return (
        <>
          <h3
            onClick={() =>
              setIsOpen((preState) => ({
                ...preState,
                [i]: !preState[i],
              }))
            }
          >
            <>
              Line {lineNumber[0]} has{lineNumber[1]} stops
            </>
            {isOpen[i] ? <ExpandLess /> : <ExpandMore />}
          </h3>
          <ul>
            {isOpen[i] &&
              pickTopTenLines[lineNumber[0]].map((stop) => (
                <li>{stop.StopPointName}</li>
              ))}
          </ul>
        </>
      );
    });
  }

  /*  return (
   <>
      <div>
        {Object.entries(lines).map((arr, i) => {
          return (
            <div>
              <h3
                onClick={() =>
                  setIsOpen((preState) => ({
                    ...preState,
                    [i]: !preState[i],
                  }))
                }
              >
                <DirectionsBusIcon /> {arr[0]}
                {isOpen[i] ? <ExpandLess /> : <ExpandMore />}
              </h3>
              <ul>
                {isOpen[i] &&
                  arr[1].map((line) => {
                    return <li>{line.StopPointName}</li>;
                  })}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  ); */
}

export default App;
