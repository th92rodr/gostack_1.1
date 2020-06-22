const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const { logRequests } = require("./middleware");

const app = express();

app.use(express.json());
app.use(cors());
app.use(logRequests);
app.use(routes);

module.exports = app;
