// Dependencies

var express = require("express");
var path = require("path");
const fs = require(`fs`);
const notes = require(`./db/db.json`);

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
