const pool = require("../database/Db");
const NoteModel = require("../model/notes");

const getNotes = async (req, res) => {
  try {
    const notes = await NoteModel.getAllNotes();
    res.json(notes);
  } catch (err) {
    console.error("Error retrieving notes", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getNote = async (req, res) => {
  const noteId = req.params.id;
  try {
    const note = await NoteModel.getNoteById(noteId);
    if (!note) {
      res.status(404).json({ error: "Note not found" });
    } else {
      res.json(note);
    }
  } catch (err) {
    console.error("Error retrieving note", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addNote = async (req, res) => {
  const { title, image, download_link } = req.body;
  const created_at = new Date();
  const newNote = { title, image, download_link, created_at };
  try {
    const note = await NoteModel.createNote(newNote);
    res.status(201).json(note);
  } catch (err) {
    console.error("Error creating note", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateNoteDetails = async (req, res) => {
  const noteId = req.params.id;
  const { title, image, download_link } = req.body;
  try {
    const updatedNote = await NoteModel.updateNote(noteId, {
      title,
      image,
      download_link
    });
    if (!updatedNote) {
      res.status(404).json({ error: "Note not found" });
    } else {
      res.json(updatedNote);
    }
  } catch (err) {
    console.error("Error updating note", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const removeNote = async (req, res) => {
  const noteId = req.params.id;
  try {
    const rowCount = await NoteModel.deleteNote(noteId);
    if (rowCount === 1) {
      res.json({ message: "Note deleted successfully" });
    } else {
      res.status(404).json({ error: "Note not found" });
    }
  } catch (err) {
    console.error("Error deleting note", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const incrementDownload = async (req, res) => {
  const noteId = req.params.id;
  try {
      const rowCount = await NoteModel.incrementDownloadCount(noteId);
      if (rowCount === 1) {
          res.json({ message: "Download count updated successfully" });
      } else {
          res.status(404).json({ error: "Note not found" });
      }
  } catch (err) {
      console.error("Error updating download count", err);
      res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getNotes,
  getNote,
  addNote,
  updateNoteDetails,
  removeNote,
  incrementDownload
};
