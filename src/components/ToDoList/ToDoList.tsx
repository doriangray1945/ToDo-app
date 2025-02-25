import React, { useEffect, useState } from 'react';
import TodoItem from '../ToDoItem/ToDoItem';
import InputField from '../../components/InputField/InputField';
import './ToDoList.css'

interface Task {
  id: number;
  task: string;
  completed: boolean;
}

export interface ToDoListType {
  id: number;
  name: string;
  tasks: Task[];
  color: string;
}

interface ToDoListProps {
  list: ToDoListType;
  onUpdateList: (updatedList: ToDoListType) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({ list, onUpdateList }) => {

  const [updatedList, setUpdatedList] = useState<ToDoListType>(list);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all'); 

  useEffect(() => {
    onUpdateList(updatedList);
  }, [updatedList]);

  const addTask = (task: string) => {
    const updatedTasks = [...list.tasks, { id: Date.now(), task, completed: false }];
    updatedList.tasks = updatedTasks;
    setUpdatedList(updatedList);
  };

  const toggleTask = (taskId: number) => {
    const updatedTasks = list.tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    updatedList.tasks = updatedTasks;
    setUpdatedList(updatedList);
  };

  const remainingTasks = (tasks: Task[]) => tasks.filter(task => !task.completed).length;

  const clearCompletedTasks = () => {
    const updatedTasks = list.tasks.filter(task => !task.completed);
    updatedList.tasks = updatedTasks;
    setUpdatedList(updatedList);
  };

  const filteredTasks = (tasks: Task[]) => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  };

  return (
    <div>
      <div className='tasks-count'>
        Количество оставшихся задач: {remainingTasks(list.tasks)}
      </div>
      <InputField onAddTask={addTask} />
      
      {filteredTasks(list.tasks).map((task) => (
        <TodoItem
          key={task.id}
          task={task.task}
          completed={task.completed}
          onToggle={() => toggleTask(task.id)}
        />
      ))}

      <div className='card-end'>
        <button onClick={clearCompletedTasks} className='clear-btn'>Очистить выполненные</button>
        <div className='filter-container'>
          <label>
            Фильтр задач:
            <select onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'completed')} value={filter}>
              <option value="all">Все</option>
              <option value="active">Невыполненные</option>
              <option value="completed">Выполненные</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
