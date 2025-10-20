/**
 * Simple Module Example
 * This demonstrates how to create a basic OpenSiS module
 */

import React, { useState } from 'react';

export default function SimpleModule() {
  const [counter, setCounter] = useState(0);
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState('');

  const handleAddNote = () => {
    if (noteInput.trim()) {
      setNotes([...notes, { id: Date.now(), text: noteInput, timestamp: new Date() }]);
      setNoteInput('');
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="nova-container">
      {/* Header */}
      <h1 className="nova-title">Simple Module Example</h1>
      <p className="nova-desc">
        A basic module demonstrating state management, user input, and styling.
      </p>

      {/* Counter Section */}
      <div className="nova-card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
          Counter Example
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => setCounter(counter - 1)}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'var(--error)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'var(--transition)',
            }}
          >
            -
          </button>
          <div
            style={{
              fontSize: '2rem',
              fontWeight: '800',
              color: 'var(--primary)',
              minWidth: '60px',
              textAlign: 'center',
            }}
          >
            {counter}
          </div>
          <button
            onClick={() => setCounter(counter + 1)}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'var(--success)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'var(--transition)',
            }}
          >
            +
          </button>
          <button
            onClick={() => setCounter(0)}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'var(--text-secondary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'var(--transition)',
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Notes Section */}
      <div className="nova-card">
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
          Notes Example
        </h2>

        {/* Input */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <input
            type="text"
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
            placeholder="Enter a note..."
            style={{
              flex: 1,
              padding: '0.75rem',
              border: '2px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '1rem',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text)',
            }}
          />
          <button
            onClick={handleAddNote}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'var(--transition)',
            }}
          >
            Add Note
          </button>
        </div>

        {/* Notes List */}
        {notes.length === 0 ? (
          <div
            style={{
              padding: '2rem',
              textAlign: 'center',
              color: 'var(--text-muted)',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            No notes yet. Add one above!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {notes.map((note) => (
              <div
                key={note.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', color: 'var(--text)' }}>
                    {note.text}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    {note.timestamp.toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'var(--error)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    transition: 'var(--transition)',
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div
        style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)',
          borderRadius: 'var(--radius-md)',
          border: '2px solid var(--primary-light)',
        }}
      >
        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem', color: 'var(--primary)' }}>
          💡 Module Tips
        </h3>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
          <li>Use CSS variables for consistent theming</li>
          <li>Keep state management local to your module</li>
          <li>Follow the existing design patterns</li>
          <li>Test in both light and dark modes</li>
          <li>Make your module responsive for mobile devices</li>
        </ul>
      </div>
    </div>
  );
}
