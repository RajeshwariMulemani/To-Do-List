const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const NotesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  notes_date: {
    type: Date,
    default: Date.now
  },
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = UserNotes = mongoose.model('user_notes', NotesSchema);
