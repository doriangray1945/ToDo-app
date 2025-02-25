import React from 'react';
import './ToDoItem.css';

interface TodoItemProps {
  task: string;
  completed: boolean;
  onToggle: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, completed, onToggle }) => {
  return (
    <div>
      <input type="checkbox" checked={completed} onChange={onToggle} />
      <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
        {task}
      </span>
    </div>
  );
};

export default TodoItem;