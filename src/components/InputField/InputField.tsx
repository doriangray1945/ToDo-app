import React, { useState } from 'react';
import './InputField.css'

interface TodoInputProps {
  onAddTask: (task: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTask }) => {
  const [task, setTask] = useState('');

  const handleAddTask = () => {
    if (task.trim()) {
      onAddTask(task);
      setTask('');
    }
  };

  return (
    <div className='input-field-container'>
      <input
        className='input-field'
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Введите новую задачу"
      />
      <button className='add-task-btn' onClick={handleAddTask}>Добавить</button>
    </div>
  );
};

export default TodoInput;