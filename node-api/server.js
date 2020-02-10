const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://admin:admin@c-ariel-g3h09.mongodb.net/nodejs?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
}).catch(err => console.log(err.reason));


requireDir("./src/models");

app.use("/api", require("./src/routes"));

app.listen(3333);