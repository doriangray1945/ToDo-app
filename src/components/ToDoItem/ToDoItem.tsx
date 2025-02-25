import React from 'react';
import './ToDoItem.css';

interface TodoItemProps {
  task: string;
  completed: boolean;
  onToggle: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, completed, onToggle }) => {
  return (
    <div className="todo-item">
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggle}
          className="checkbox-input"
        />
        <span className="checkmark"></span>
      </label>
      <span className={`task-text ${completed ? 'completed' : ''}`}>
        {task}
      </span>
    </div>
  );
};

export default TodoItem;