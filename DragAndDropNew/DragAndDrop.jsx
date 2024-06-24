import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';

const ItemType = 'TASK';

const initialItems = [
  { id: 'task-1', content: 'Task 1' },
  { id: 'task-2', content: 'Task 2' },
  { id: 'task-3', content: 'Task 3' },
];

const initialCompletedItems = [
  { id: 'completed-task-1', content: 'Completed Task 1' },
  { id: 'completed-task-2', content: 'Completed Task 2' },
];

const App = () => {
  const [tasks, setTasks] = useState(initialItems);
  const [completedTasks, setCompletedTasks] = useState(initialCompletedItems);

  const moveTask = (taskId, from, to) => {
    const sourceList = from === 'tasks' ? tasks : completedTasks;
    const targetList = to === 'tasks' ? tasks : completedTasks;
    const setSourceList = from === 'tasks' ? setTasks : setCompletedTasks;
    const setTargetList = to === 'tasks' ? setTasks : setCompletedTasks;

    const taskIndex = sourceList.findIndex(task => task.id === taskId);
    const [task] = sourceList.splice(taskIndex, 1);
    targetList.push(task);

    setSourceList([...sourceList]);
    setTargetList([...targetList]);
  };

  const Task = ({ task, listType }) => {
    const [{ isDragging }, drag] = useDrag({
      type: ItemType,
      item: { id: task.id, from: listType },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    return (
      <div
        ref={drag}
        className={`task ${isDragging ? 'dragging' : ''}`}
      >
        {task.content}
      </div>
    );
  };

  const TaskList = ({ title, tasks, listType }) => {
    const [, drop] = useDrop({
      accept: ItemType,
      drop: (item) => moveTask(item.id, item.from, listType),
    });

    return (
      <div ref={drop} className="task-list">
        <h2>{title}</h2>
        {tasks.map((task) => (
          <Task key={task.id} task={task} listType={listType} />
        ))}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        <TaskList title="Tasks" tasks={tasks} listType="tasks" />
        <TaskList title="Completed Tasks" tasks={completedTasks} listType="completedTasks" />
      </div>
    </DndProvider>
  );
};

export default App;
