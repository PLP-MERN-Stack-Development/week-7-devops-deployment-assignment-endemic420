import React from 'react';

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 transition-all duration-200 ${
      task.completed 
        ? 'border-green-400 bg-green-50 opacity-75' 
        : 'border-blue-400 hover:shadow-lg'
    }`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className={`text-lg font-semibold mb-2 ${
            task.completed ? 'line-through text-gray-500' : 'text-gray-800'
          }`}>
            {task.title}
          </h3>
          {task.description && (
            <p className={`mb-3 ${
              task.completed ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {task.description}
            </p>
          )}
          <small className="text-gray-400 text-sm">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </small>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onToggle(task._id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition duration-200 ${
              task.completed
                ? 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                : 'bg-green-100 text-green-800 hover:bg-green-200'
            }`}
          >
            {task.completed ? 'Undo' : 'Complete'}
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium hover:bg-red-200 transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;