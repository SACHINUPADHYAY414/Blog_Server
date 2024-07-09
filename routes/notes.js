const express = require("express");
const router = express.Router();
const {
  getNotes,
  getNote,
  addNote,
  updateNoteDetails,
  removeNote,
  incrementDownload
} = require("../controllers/notesController");

// GET all notes
router.get("/getAllNotes", getNotes);

// GET a specific note by ID
router.get("/:id", getNote);

// POST create a new note
router.post("/addNote", addNote);

// PUT update details of a note
router.put("/:id", updateNoteDetails);

// DELETE a note by ID
router.delete("/deleteNote/:id", removeNote);

// PUT increment download count for a note
router.put("/:id/incrementDownload", incrementDownload);

module.exports = router;
