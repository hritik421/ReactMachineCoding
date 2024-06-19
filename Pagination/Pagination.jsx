import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://give-me-users-forever.vercel.app/api/users/${page * 10}/next`);
      const result = await response.json();
      setData(result?.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      return 0;
    });

    setData(sortedData);
    setSortConfig({ key, direction });
  };

  const handlePagination = (pageNumber) => {
    if (pageNumber >= 0) {
      setPage(pageNumber);
    }
  };

  const getPaginationRange = () => {
    const range = [];
    const totalPages = 10; // Assuming there are 10 pages for demonstration
    const maxVisiblePages = 5;
    const start = Math.max(0, page - Math.floor(maxVisiblePages / 2));
    const end = Math.min(totalPages, start + maxVisiblePages);

    for (let i = start; i < end; i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <div className="main-container">
      <h2>Advanced Pagination Techniques in React for Better UX</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('ID')}>Id</th>
            <th onClick={() => handleSort('FirstNameLastName')}>Name</th>
            <th onClick={() => handleSort('JobTitle')}>Job Title</th>
            <th onClick={() => handleSort('Company')}>Company</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.ID}>
              <td>{d.ID}</td>
              <td>{d.FirstNameLastName}</td>
              <td>{d.JobTitle}</td>
              <td>{d.Company}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        <span onClick={() => handlePagination(page - 1)} className={page < 1 ? "pagination__disable" : ""}>Prev</span>
        {
          getPaginationRange().map((ind) => (
            <span key={ind} onClick={() => handlePagination(ind)} className={page === ind ? "pagination__selected" : ""}>
              {ind + 1}
            </span>
          ))
        }
        <span onClick={() => handlePagination(page + 1)} className={page >= 10 ? "pagination__disable" : ""}>Next</span>
      </div>
    </div>
  );
}

export default App;
