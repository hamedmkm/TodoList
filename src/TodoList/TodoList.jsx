import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import EditTodo from '../EditTodo/EditTodo';
import './TodoList.css'; // اضافه کردن فایل CSS انیمیشن

function TodoList({ todos, filter, categoryFilter, toggleTodo, updateTodo, deleteTodo }) {
  const [editingTodo, setEditingTodo] = useState(null);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed' && !todo.completed) return false;
    if (filter === 'incomplete' && todo.completed) return false;
    if (categoryFilter !== 'all' && todo.category !== categoryFilter) return false;
    return true;
  });

  const startEdit = (todo) => setEditingTodo(todo);
  const cancelEdit = () => setEditingTodo(null);

  return (
    <div>
      {editingTodo ? (
        <EditTodo
          todo={editingTodo}
          updateTodo={updateTodo}
          cancelEdit={cancelEdit}
        />
      ) : (
        <TransitionGroup>
          {filteredTodos.map(todo => (
            <CSSTransition
              key={todo.id}
              timeout={300}
              classNames="todo"
            >
              <li>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                {todo.text} - {todo.category}
                <button onClick={() => startEdit(todo)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}
    </div>
  );
}

export default TodoList;
