const cors = require("cors");
const express = require("express");
const { default: mongoose } = require("mongoose");

// database connector
const MONGODB_CONNECTION =
  "mongodb+srv://soum-ik:frontenddev@cluster0.dunrodk.mongodb.net/ecomarce?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

const port = 6969;
app.use(cors());
app.use(express.json());

// connection maker

mongoose
  .connect(MONGODB_CONNECTION, { autoIndex: true })
  .then(() => {
    console.log("Database Connected");
    const productCollection = mongoose.connection.db.collection("product");
    const orderCollection = mongoose.connection.db.collection("order");

    app.get("/oder", (res, req) => {

    }); 

  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

app.get("/", (res, req) => {
  res.send("Helllo buddy");
});

app.listen(port, () => {
  console.log("Listening port" + port);
});
