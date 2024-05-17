import React, { useState, useEffect } from 'react';

//import reactLogo from './assets/react.svg'
import './App.css'

const App = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [experience, setExperience] = useState(0);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:8000/api/denoKv");
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
  }, []); // Empty dependency array to run effect only once after initial render

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = { name, gender, experience };

    try {
      const response = await fetch("http://localhost:8000/api/denoKv", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage("User added successfully!");
        console.log(result);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          placeholder="Gender"
          required
        />
        <input
          type="number"
          value={experience}
          onChange={(e) => setExperience(Number(e.target.value))}
          placeholder="Experience"
          required
        />
        <button type="submit">Add User</button>
      </form>
      {message && <p>{message}</p>}
      <div>
      <h1>User List</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            Name: {user.name}, Gender: {user.gender}, Experience: {user.experience}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default App;
