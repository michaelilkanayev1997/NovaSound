import express from "express";
import "dotenv/config";
import "express-async-errors";
import "./db";

import authRouter from "./routers/auth";
import audioRouter from "./routers/audio";
import favoriteRouter from "./routers/favorite";
import playlistRouter from "./routers/playlist";
import profileRouter from "./routers/profile";
import historyRouter from "./routers/history";
import "./utils/schedule";
import { errorHandler } from "./middleware/error";

// create a server
const app = express();

/******** register middleware ********/

// this will parse post request coming from fetch.post() method
app.use(express.json());
// this will parse post request coming from html form
app.use(express.urlencoded({ extended: false }));
// this is the static folder
app.use(express.static("src/public"));

app.use("/auth", authRouter);
app.use("/audio", audioRouter);
app.use("/favorite", favoriteRouter);
app.use("/playlist", playlistRouter);
app.use("/profile", profileRouter);
app.use("/history", historyRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Port is listening on port " + PORT);
});
