import React, { useState,useEffect  } from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Filters from '../Filters/Fillters';
import TodoList from '../TodoList/TodoList';
function App() {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [deletedTodo, setDeletedTodo] = useState(null);
    const [undoTimeout, setUndoTimeout] = useState(null);
    const [duplicateTodo, setDuplicateTodo] = useState(null); // New state for duplicate Todo
  
    useEffect(() => {
      const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
      setTodos(savedTodos);
    }, []);
  
    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);
  
    const addTodo = (newTodo) => {
      // Check if a Todo with the same text already exists
      const isDuplicate = todos.some(todo => todo.text === newTodo.text);
      if (isDuplicate) {
        setDuplicateTodo(newTodo);
        return;
      }
  
      setTodos([...todos, newTodo]);
      setDuplicateTodo(null); // Clear duplicate state if not duplicate
    };
  
    const toggleTodo = (id) => {
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    };
  
    const updateTodo = (updatedTodo) => {
      setTodos(
        todos.map(todo =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
    };
  
    const deleteTodo = (id) => {
      const todoToDelete = todos.find(todo => todo.id === id);
      setDeletedTodo(todoToDelete);
  
      setTodos(todos.filter(todo => todo.id !== id));
  
      // Set a timeout for undo
      if (undoTimeout) {
        clearTimeout(undoTimeout);
      }
  
      const timeout = setTimeout(() => {
        setDeletedTodo(null);
      }, 5000); // 5 seconds to undo
  
      setUndoTimeout(timeout);
    };
  
    const undoDelete = () => {
      if (deletedTodo) {
        setTodos([...todos, deletedTodo]);
        setDeletedTodo(null);
        if (undoTimeout) {
          clearTimeout(undoTimeout);
        }
      }
    };
  
    return (
      <div>
        <AddTodo addTodo={addTodo} duplicateTodo={duplicateTodo} />
        <Filters setFilter={setFilter} setCategoryFilter={setCategoryFilter} />
        <TodoList
          todos={todos}
          filter={filter}
          categoryFilter={categoryFilter}
          toggleTodo={toggleTodo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
        {deletedTodo && (
          <div>
            <button onClick={undoDelete}>Undo</button>
          </div>
        )}
      </div>
    );
  }
  
  export default App;