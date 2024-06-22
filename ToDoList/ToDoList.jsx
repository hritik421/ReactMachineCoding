import './App.css';
import { useState } from 'react';

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [liElement, setLiElement] = useState([
    { text: "Walk the dog", isEditing: false },
    { text: "Water the plants", isEditing: false },
    { text: "Wash the dishes", isEditing: false }
  ]);

  const addItem = () => {
    if (searchText.trim() !== "") {
      setLiElement([...liElement, { text: searchText, isEditing: false }]);
      setSearchText("");
    }
  };

  const deleteItem = (index) => {
    setLiElement(liElement.filter((_, i) => i !== index));
  };

  const editItem = (index) => {
    const newList = liElement.map((item, i) => {
      if (i === index) {
        return { ...item, isEditing: true };
      }
      return item;
    });
    setLiElement(newList);
  };

  const saveItem = (index, newText) => {
    const newList = liElement.map((item, i) => {
      if (i === index) {
        return { text: newText, isEditing: false };
      }
      return item;
    });
    setLiElement(newList);
  };

  const handleEditChange = (index, newText) => {
    const newList = liElement.map((item, i) => {
      if (i === index) {
        return { ...item, text: newText };
      }
      return item;
    });
    setLiElement(newList);
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add your task"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={addItem}>Submit</button>
      </div>
      <ul>
        {liElement.map((item, index) => (
          <li key={index} className="list-item">
            {item.isEditing ? (
              <>
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => handleEditChange(index, e.target.value)}
                />
                <button onClick={() => saveItem(index, item.text)}>Save</button>
              </>
            ) : (
              <>
                <span>{item.text}</span>
                <button onClick={() => editItem(index)}>Edit</button>
                <button onClick={() => deleteItem(index)} aria-label={`Delete ${item.text}`}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
