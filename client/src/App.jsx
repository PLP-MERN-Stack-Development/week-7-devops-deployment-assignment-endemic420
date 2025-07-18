import React, { useState, useEffect } from 'react';
import TaskForm from './components/taskForm';
import TaskList from './components/taskList';
import { taskAPI } from './services/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getTasks();
      setTasks(response.data);
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskAdd = async (taskData) => {
    try {
      const response = await taskAPI.createTask(taskData);
      setTasks([response.data, ...tasks]);
      setError(null);
    } catch (err) {
      setError('Failed to add task');
      console.error(err);
    }
  };

  const handleTaskToggle = async (id) => {
    try {
      const task = tasks.find(t => t._id === id);
      const response = await taskAPI.updateTask(id, { completed: !task.completed });
      setTasks(tasks.map(t => t._id === id ? response.data : t));
      setError(null);
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  };

  const handleTaskDelete = async (id) => {
    try {
      await taskAPI.deleteTask(id);
      setTasks(tasks.filter(t => t._id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Task Manager</h1>
          <p className="text-gray-600">Organize your tasks and boost productivity</p>
          
          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md max-w-md mx-auto">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
        </header>
        
        {/* Main Content */}
        <main className="space-y-8">
          <TaskForm onTaskAdd={handleTaskAdd} />
          <TaskList
            tasks={tasks}
            onToggle={handleTaskToggle}
            onDelete={handleTaskDelete}
          />
        </main>
        
        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Dennis Karanja. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;