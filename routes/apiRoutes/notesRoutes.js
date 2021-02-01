const router = require("express").Router();
const { notes } = require("../../db/db");
const { createNote, findById, editNote, removeNote } = require("../../lib/notes");
let idCount = 0;

router.get("/notes", (req, res) => {
  res.json(notes);
});

router.post("/notes", (req, res) => {
  if (!req.body.id) {
    req.body.id = idCount++;
    createNote(req.body, notes);
  } else {
    editNote(req.body, notes);
  }

  res.json(req.body);
});

router.delete("/notes/:id", (req, res) => {
  const note = findById(req.params.id, notes);

  removeNote(note, notes);
  res.json();
});

module.exports = router;
