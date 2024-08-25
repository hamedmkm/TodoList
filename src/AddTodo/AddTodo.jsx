import React, { useState, useEffect } from 'react';
import './AddTodo.css'; // Import the CSS file

function AddTodo({ addTodo, duplicateTodo }) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (duplicateTodo) {
      setText('');
    }
  }, [duplicateTodo]);

  const handleAddClick = () => {
    if (text.trim()) {
      addTodo({
        id: Date.now(), // Generate a unique id
        text,
        completed: false
      });
    }
  };

  return (
    <div className={`add-todo-container ${duplicateTodo ? 'duplicate' : ''}`}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={handleAddClick}>Add Todo</button>
    </div>
  );
}

export default AddTodo;
