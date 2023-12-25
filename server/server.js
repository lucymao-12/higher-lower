import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import fetch from "node-fetch";

dotenv.config();

// variables

let accessToken = null;
const playlistId = "37i9dQZEVXbMDoHDwVN2tF";
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

// app config
const app = express();
app.use(express.json());
app.use(cors());

async function getToken() {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      body: "grant_type=client_credentials",
    });

    const data = await response.json();
    return data.access_token; // Return the token directly
  } catch (err) {
    console.error(err);
    return null; // Return null or throw an error
  }
}

await getToken().then((data) => {
  accessToken = data;
});

async function getPlaylist(playlistId, accessToken) {
  // using global top 50 playlist
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();
    return data; // Return the data directly
  } catch (err) {
    console.error(err);
    return null;
  }
}
let playlistData = null;
await getPlaylist(playlistId, accessToken).then((data) => {
  playlistData = data;
});

class Track {
  constructor(track) {
    this.name = track.name;
    this.artist = track.artists[0].name;
    this.album = track.album.name;
    this.image = track.album.images[0].url;
    this.popularity = track.popularity;
  }
}

app.get("/", (req, res) => {
  try {
    const track = new Track(playlistData.tracks.items[0].track);
    res.status(200).json(track);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
