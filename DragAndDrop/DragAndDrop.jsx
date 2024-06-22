import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

const initialItems = [
  { id: '1', content: 'Item 1' },
  { id: '2', content: 'Item 2' },
  { id: '3', content: 'Item 3' },
];

const App = () => {
  const [currentItems, setCurrentItems] = useState(initialItems);
  const [completedItems, setCompletedItems] = useState([]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    let updatedCurrentItems = Array.from(currentItems);
    let updatedCompletedItems = Array.from(completedItems);

    // Moving within the same list
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === 'currentItems') {
        const [removed] = updatedCurrentItems.splice(source.index, 1);
        updatedCurrentItems.splice(destination.index, 0, removed);
        setCurrentItems(updatedCurrentItems);
      } else {
        const [removed] = updatedCompletedItems.splice(source.index, 1);
        updatedCompletedItems.splice(destination.index, 0, removed);
        setCompletedItems(updatedCompletedItems);
      }
    } else {
      // Moving between different lists
      if (source.droppableId === 'currentItems') {
        const [removed] = updatedCurrentItems.splice(source.index, 1);
        updatedCompletedItems.splice(destination.index, 0, removed);
        setCurrentItems(updatedCurrentItems);
        setCompletedItems(updatedCompletedItems);
      } else {
        const [removed] = updatedCompletedItems.splice(source.index, 1);
        updatedCurrentItems.splice(destination.index, 0, removed);
        setCompletedItems(updatedCompletedItems);
        setCurrentItems(updatedCurrentItems);
      }
    }
  };

  return (
    <div className='app-container'>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className='list-container'>
          <h2>Current Items</h2>
          <Droppable droppableId="currentItems">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef} className='item-list'>
                {currentItems.map(({ id, content }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className='item'
                      >
                        {content}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
        <div className='list-container'>
          <h2>Completed Items</h2>
          <Droppable droppableId="completedItems">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef} className='item-list'>
                {completedItems.map(({ id, content }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className='item'
                      >
                        {content}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
