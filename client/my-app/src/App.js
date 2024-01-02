import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [data, setData] = useState(null); // Initialize state to store fetched data
  const [currentPage, setCurrentPage] = useState("home");
  const [score, setScore] = useState(0);
  const [currentTrackRight, setCurrentTrackRight] = useState(null);
  const [currentTrackLeft, setCurrentTrackLeft] = useState(null);

  function getData() {
    fetch("http://localhost:3000")
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setData(data);
        setCurrentTrackLeft(data.pop());
        console.log(currentTrackLeft);
        setCurrentTrackRight(data.pop());
        setCurrentPage("game");
      });
  }

  function showRules() {
    setCurrentPage("rules");
  }

  function startGame() {
    setData(null);
    setScore(0);
    setCurrentTrackLeft(null);
    setCurrentTrackRight(null);
    getData();
  }

  const handleHigher = () => {
    if (currentTrackRight.popularity >= currentTrackLeft.popularity) {
      setScore(score + 1);
      setCurrentTrackLeft(currentTrackRight);
      setCurrentTrackRight(data.pop());
    } else {
      setCurrentPage("end");
    }
  };

  const handleLower = () => {
    if (currentTrackRight.popularity <= currentTrackLeft.popularity) {
      setScore(score + 1);
      setCurrentTrackLeft(currentTrackRight);
      setCurrentTrackRight(data.pop());
    } else {
      setCurrentPage("end");
    }
  };

  return (
    <div className="container">
      {currentPage === "home" && (
        <>
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "5%",
            }}
          >
            Spotify higher or Lower
          </h1>
          <div className="button-container main">
            <button onClick={startGame} className="button btn btn-primary">
              Start
            </button>
            <button onClick={showRules} className="button btn btn-primary">
              Rules
            </button>
          </div>
        </>
      )}
      {currentPage === "rules" && (
        <>
          <p className="rules">
            Spotify, unfortunately does not offer a monthly listens, number of
            plays, etc for a specific track but it does offer a popularity
            rating for each track. Which is a more time sensitive number that
            evaluates how many times a song has been played. This game is
            inspired by{" "}
            <a
              className="link-no-style"
              href="https://www.higherlowergame.com/"
            >
              this amazing game!
            </a>{" "}
            <br />
            If you think that the song on the right is more popular than the
            song on the left press higher, else lower. It's as simple as that!
          </p>
          <div className="button-container main">
            <button onClick={startGame} className="button btn btn-primary">
              Start
            </button>
          </div>
        </>
      )}
      {currentPage === "game" && (
        <div>
          <div className="info-container">
            <h2 className="score">Score: {score}</h2>
            <p className="popularity">
              Popularity: {currentTrackLeft.popularity}
            </p>
          </div>
          <div className="track-container">
            <div className="leftTrack">
              <img
                className="track"
                src={currentTrackLeft.image}
                alt="album cover"
              ></img>
              <div className="track-info">
                <p className="info">Name: {currentTrackLeft.name}</p>
                <p className="info">Artist: {currentTrackLeft.artist}</p>
              </div>
            </div>
            <div className="rightTrack">
              <img
                className="track"
                src={currentTrackRight.image}
                alt="album cover"
              ></img>
              <div className="track-info">
                <p className="info">Name: {currentTrackRight.name}</p>
                <p className="info">Artist: {currentTrackRight.artist}</p>
              </div>

              <div className="button-container">
                <button
                  onClick={handleHigher}
                  className="button btn btn-primary"
                >
                  Higher
                </button>
                <button
                  onClick={handleLower}
                  className="button btn btn-primary"
                >
                  Lower
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentPage === "end" && (
        <>
          <p className="ending">You got: {score} points!</p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button className="button btn btn-primary" onClick={startGame}>
              Start Again
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
