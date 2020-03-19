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

// Routes

// Basic route that sends the user first tot he AJAX page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("public/assets/css/stlyes.css", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/assets/css/stlyes.css"));
});

app.get("/public/assets/js/index.js", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/assets/js/index.js"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function(req, res) {
  fs.readFile("./db/db.json", `utf-8`, (err, data) => {
    if (err) throw err;
    return res.json(notes);
  });
});

app.post(`/api/notes`, function(req, res) {
  const newNote = req.body;
  newNote.routeName = newNote.title.replace(/\s+/g, "").toLowerCase();
  newNote.id = newNote.title.replace(/\s+/g, "").toUpperCase();

  console.log(`receiving data`);
  console.log(`body is `, req.body);

  notes.push(newNote);

  res.json(newNote);
});
