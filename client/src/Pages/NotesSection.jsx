import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';

const initialNotes = [
  { id: 1, text: "Important: The video discusses the fundamental principles of quantum computing.", timestamp: "10:30 AM" },
];

const NotesSection = ({ isDarkMode }) => { // Receiving isDarkMode prop
  const [notes, setNotes] = useState(initialNotes);
  const [newNote, setNewNote] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // ... (CRUD handlers remain the same) ...

  return (
    <div className="notes-container">
      <h3 className="notes-heading">Add Note</h3>
      <textarea
        placeholder="Write your note here..."
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        className="note-textarea"
      />
      <button
        onClick={() => { /* ... add note logic ... */ }}
        className="note-add-button"
        disabled={!newNote.trim()}
      >
        Add Note
      </button>

      <h3 className="notes-heading">Your Notes</h3>
      <div className="notes-list custom-scrollbar">
        {notes.length === 0 ? (
          <p style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', textAlign: 'center', marginTop: '40px' }}>No Notes</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="note-item">
              {editingId === note.id ? (
                <>
                  <textarea value={editingText} onChange={(e) => setEditingText(e.target.value)} className="note-textarea" style={{ height: 'auto', marginBottom: '8px' }} rows="3" />
                  {/* ... Save/Cancel Buttons ... */}
                </>
              ) : (
                <>
                  <p className="note-text">{note.text}</p>
                  <div className="note-footer">
                    <span>{note.timestamp}</span>
                    <div className="note-actions">
                      <button className="note-action-button edit-button"><Edit className="w-4 h-4" /></button>
                      <button className="note-action-button delete-button"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesSection;