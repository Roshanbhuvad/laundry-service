const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = 5000;
const { MONGOURI } = require("./key");

const app = express();

app.use(bodyParser.json());

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongoDB database");
});
mongoose.connection.on("error", (err) => {
  console.log("err connecting", err);
});

// initialize routes
app.use("/api", require("./routes/owner"));
app.use("/user", require("./routes/customer"));

// Error handling middleware
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(422).send({ error: err.message });
});

// Listen for request
app.listen(PORT, () => {
  console.log("server listening on port", PORT);
});
