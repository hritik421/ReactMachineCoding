import './App.css';
import { useState, useEffect } from 'react';

export default function App() {

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [text, setText] = useState("");

  useEffect( () => {
    fetchData();
  }, []);

  const handleSearch = () => {
    const filterData = data.filter((d) => d.FirstNameLastName.includes(text));
    setFilteredData(filterData);
  }

  const fetchData = async () => {
    try{
      const response = await fetch(`https://give-me-users-forever.vercel.app/api/users/0/next`);
      const result = await response.json();
      setData(result.users);
      setFilteredData(result.users);
    } catch(ex){
      console.error(ex);
    }
    
  }

  return (
    <div className='container'>
      <h2> API Fetch Practice: Search and Display User Data</h2>
      <div className='Search'>
        <input type='text' placeholder='Search by using Name'
        value={text} onChange={(e)=> setText(e.target.value)}/>
        <button onClick={()=> handleSearch()}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredData ? filteredData.map((d) => {
              return <tr>
                <td>{d.FirstNameLastName}</td>
                <td>{d.Email}</td>
                <td>{d.Company}</td>
              </tr>
            }): <tr>
              <td colSpan={3}>Loading...</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}
