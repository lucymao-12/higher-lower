import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import fetch from "node-fetch";

dotenv.config();

// variables

let accessToken = null;
//let tokenExpiration = null;

const playlistId = "37i9dQZEVXbMDoHDwVN2tF";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

//console.log(client_id);
//console.log(client_secret);

const app = express();

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
//console.log(accessToken);

async function getPlaylist(playlistId, accessToken) {
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
    return data; // This will return the playlist data
  } catch (err) {
    console.error(err);
    return null; // Or handle the error as you see fit
  }
}
let playlistData = null;
await getPlaylist(playlistId, accessToken).then((data) => {
  playlistData = data;
});

console.log(playlistData);
