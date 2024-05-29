const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const { jwtAuthMiddleware } = require("./jwt"); // Destructure the imported object

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.get("/protected-route", jwtAuthMiddleware, (req, res) => {
  res.send(`Hello ${req.user.name}, you have access to this route.`);
});

// Import the router files
const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");

// Use the routers
app.use("/user", userRoutes);
app.use("/candidate", candidateRoutes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
