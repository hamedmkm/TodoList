
import React, { useState } from 'react';

function EditTodo({ todo, updateTodo, cancelEdit }) {
  const [text, setText] = useState(todo.text);
  const [category, setCategory] = useState(todo.category);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTodo({
      ...todo,
      text,
      category,
    });
    cancelEdit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit">Save</button>
      <button type="button" onClick={cancelEdit}>Cancel</button>
    </form>
  );
}

export default EditTodo;
