import React, { useState } from 'react';

const initialTodos = [
  { id: 1, task: 'call supply chain', time: '09:30 AM', completed: true },
  { id: 2, task: 'new product review', time: '11:00 AM', completed: false },
  { id: 3, task: 'check new orders in warehouse', time: '02:00 PM', completed: true },
  { id: 4, task: 'add some discount on product for diwali', time: '10:30 AM', completed: false },
];

function Todo() {
  const [todos, setTodos] = useState(initialTodos);
  const [newTask, setNewTask] = useState('');
  const [newTime, setNewTime] = useState('');

  // Toggle Task Completion
  const toggleCompletion = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Add a New Task
  const addTodo = () => {
    if (newTask && newTime) {
      const newTodo = {
        id: todos.length + 1,
        task: newTask,
        time: newTime,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setNewTask('');
      setNewTime('');
    }
  };

  // Delete a Task
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80 ">
        <h3 className="text-lg font-bold text-gray-700 text-center mb-4">To Do List</h3>
        
        {/* Task List */}
        <ul className="space-y-3 mb-6">
          {todos.map((todo) => (
            <li key={todo.id} className="flex justify-between items-center border-b pb-3 last:border-b-0">
              <div>
                <p className={`text-gray-900 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                  {todo.task}
                </p>
                <p className="text-sm text-gray-500">{todo.time}</p>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="h-5 w-5 text-blue-600 rounded"
                  checked={todo.completed}
                  onChange={() => toggleCompletion(todo.id)}
                />
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Add New Task */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="New Task"
            className="border p-2 w-full mb-2 rounded"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <input
            type="text"
            placeholder="Time (e.g., 10:00 AM)"
            className="border p-2 w-full rounded"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-600 text-white py-2 px-4 w-full rounded hover:bg-blue-700"
          onClick={addTodo}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default Todo;
