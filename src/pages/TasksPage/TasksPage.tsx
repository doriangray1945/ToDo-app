import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ToDoList, { ToDoListType } from '../../components/ToDoList/ToDoList';
import './TasksPage.css';

const pastelColors = [
  '#FFB3BA', '#FFDFBF', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#FFC3A0',
];

const getRandomColor = () => pastelColors[Math.floor(Math.random() * pastelColors.length)];

const TasksPage: React.FC = () => {
  const [todoLists, setTodoLists] = useState<ToDoListType[]>([]);

  const addTodoList = (name: string) => {
    const newTodoList: ToDoListType = {
      id: Date.now(),
      name,
      tasks: [],
      color: getRandomColor(),
    };
    setTodoLists([...todoLists, newTodoList]);
  };

  const updateTodoList = (updatedList: ToDoListType) => {
    setTodoLists(todoLists.map(list => (list.id === updatedList.id ? updatedList : list)));
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (todoLists.length < 2) return;
    event.stopPropagation();
    if (Math.abs(event.deltaY) < 30) return;

    let updatedLists = [...todoLists];
    if (event.deltaY > 0) {
      updatedLists.push(updatedLists.shift() as ToDoListType);
    } else {
      updatedLists.unshift(updatedLists.pop() as ToDoListType);
    }

    setTodoLists(updatedLists);
  };

  const handleClick = (index: number) => {
    let updatedLists = [...todoLists];
    while (index !== updatedLists.length - 1) {
      updatedLists.unshift(updatedLists.pop() as ToDoListType);
      index++;
    }
    setTodoLists(updatedLists);
  };

  return (
    <div className='container-1'>
      <div className="container">
        <h1>Списки задач</h1>
        <h5>Создайте свою доску с задачами:</h5>
        <div className='add-board-container'>
          <input
            className='add-board'
            type="text"
            placeholder="Название нового списка"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                addTodoList(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
          />
        </div>

        <div className="boards-container" onWheel={handleWheel}>
          {todoLists.map((list, index) =>
            index >= todoLists.length - 3 ? (
              <motion.div
                layout
                layoutId={`board-${list.id}`}
                className={`board ${index === todoLists.length - 1 ? 'active' : 'unactive'} 
                  ${index === todoLists.length - 3 ? 'last' : ''}`}
                key={list.id}
                style={{ backgroundColor: list.color }}
                onClick={() => handleClick(index)}
                initial={{ x: 100 }}
                animate={{
                  x: index === todoLists.length - 1 ? 0 : (index === todoLists.length - 2 ? -50 : -100),
                  opacity: 1,
                  scale: index === todoLists.length - 1 ? 1.05 : 0.95
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >

                <h3>{list.name}</h3>
                {index === todoLists.length - 1 && (
                  <ToDoList 
                    list={list}
                    onUpdateList={updateTodoList}
                  />
                )}
              </motion.div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
