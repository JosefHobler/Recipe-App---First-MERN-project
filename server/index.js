const express = require("express");
const { default: mongoose } = require("mongoose");
const connectDB = require("./connection/mongo");
const mainRouter = require("./routes/mainRouter");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());

app.use(express.json());
app.use(mainRouter);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.DB_URL);
    app.listen(port, () => console.log("listening on port " + port));
  } catch (err) {
    console.log(err);
  }
};
mongoose.connection.once("open", () => console.log("open on port " + port));
mongoose.connection.on("error", () => console.log("error on port " + port));

start();
