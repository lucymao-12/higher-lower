import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
function App() {
  const [data, setData] = useState(null); // Initialize state to store fetched dat
  const [currentPage, setCurrentPage] = useState("home");
  const [score, setScore] = useState(0);
  const [currentTrackRight, setCurrentTrackRight] = useState(null);
  const [currentTrackLeft, setCurrentTrackLeft] = useState(null);
  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch("http://localhost:3000")
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setData(data);
        setCurrentTrackLeft(data.pop());
        console.log(setCurrentTrackLeft);
        setCurrentTrackRight(data.pop());
      });
  }

  function showRules() {
    setCurrentPage("rules");
  }

  function startGame() {
    setCurrentPage("game");
  }

  const handleHigher = () => {
    if (currentTrackRight.popularity < currentTrackLeft.popularity) {
      setScore(score + 1);
      setCurrentTrackLeft(currentTrackRight);
      setCurrentTrackRight(data.pop());
    } else {
      setCurrentPage("end");
    }
  };

  const handleLower = () => {
    if (currentTrackRight.popularity > currentTrackLeft.popularity) {
      setScore(score + 1);
      setCurrentTrackLeft(currentTrackRight);
      setCurrentTrackRight(data.pop());
    } else {
      setCurrentPage("end");
    }
  };

  return (
    <div>
      {currentPage === "home" && (
        <>
          <button onClick={showRules}>Rules</button>
          <button onClick={startGame}>Start</button>
        </>
      )}
      {currentPage === "rules" && (
        <>
          <p>
            Spotify, unfortunately does not offer a monthly listens, number of
            plays, etc for a specific track but it does offer a popularity
            rating for each track. Which is a more time sensitive number that
            evaluates how many times a song has been played. This game is
            inspired by
            <a href="https://www.higherlowergame.com/"> this amazing game! </a>
            If you think that the song on the right is more popular than the
            song on the left press higher, else lower. It's as simple as that!
          </p>
          <button onClick={startGame}>Start</button>
        </>
      )}
      {currentPage === "game" && (
        <>
          <div className="leftTrack">
            <img src={currentTrackLeft.image} alt="album cover"></img>
          </div>
          <div className="rightTrack">
            <img src={currentTrackRight.image} alt="album cover"></img>
            <button onClick={handleHigher}>Higher</button>
            <button onClick={handleLower}>Lower</button>
          </div>
        </>
      )}
      {currentPage === "end" && <p>{score}</p>}
    </div>
  );
}

export default App;
