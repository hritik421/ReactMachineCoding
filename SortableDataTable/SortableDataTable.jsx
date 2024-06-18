import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const dummyData = [
    { "id": 1, "name": "Leanne Graham", "email": "leanne@example.com" },
    { "id": 2, "name": "Ervin Howell", "email": "ervin@example.com" },
    { "id": 3, "name": "Clementine Bauch", "email": "clementine@example.com" },
    { "id": 4, "name": "Patricia Lebsack", "email": "patricia@example.com" },
    { "id": 5, "name": "Chelsey Dietrich", "email": "chelsey@example.com" },
    { "id": 6, "name": "Mrs. Dennis Schulist", "email": "dennis@example.com" },
    { "id": 7, "name": "Kurtis Weissnat", "email": "kurtis@example.com" },
    { "id": 8, "name": "Nicholas Runolfsdottir V", "email": "nicholas@example.com" },
    { "id": 9, "name": "Glenna Reichert", "email": "glenna@example.com" },
    { "id": 10, "name": "Clementina DuBuque", "email": "clementina@example.com" }
  ];

  const [data, setData] = useState(dummyData);
  const [sortConfig, setSortConfig] = useState({key: null, direction: 'asc'});

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const result = await response.json();
      setData(dummyData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc'){
      direction = 'desc';
    }

    const sortedData = [...data].sort((a,b) => {
      if(a[key] > b[key]){
        return direction === 'asc' ? 1 : -1;
      }

      if(a[key] < b[key]){
        return direction === 'asc' ? -1 : 1;
      }

      return 0;
    })

    setData(sortedData);
    setSortConfig({key: key, direction: direction});
  }

  return (
    <div>
      <h2>Sortable Data Table for Machine Coding Round</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>
              Id
            </th>
            <th onClick={() => handleSort('name')}>
              Name
            </th>
            <th onClick={() => handleSort('email')}>
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          {
            data.map(d => (
              <tr key={d.id}>
                <td>
                  {d.id}
                </td>
                <td>
                  {d.name}
                </td>
                <td>
                  {d.email}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
  
}

export default App;
