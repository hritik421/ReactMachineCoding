import './styles.css';
import { useState } from 'react';

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [liElement, setLiElement] = useState(["Walk the dog", "Water the plants", "Wash the dishes"]);

  const addItem = () => {
    if (searchText.trim() !== "") {
      setLiElement([...liElement, searchText]);
      setSearchText("");
    }
  };

  const deleteItem = (index) => {
    setLiElement(liElement.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="Add your task"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div>
          <button onClick={addItem}>Submit</button>
        </div>
      </div>
      <ul>
        {liElement.map((item, index) => (
          <li key={index}>
            <span>{item}</span>
            <button onClick={() => deleteItem(index)} aria-label={`Delete ${item}`}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
