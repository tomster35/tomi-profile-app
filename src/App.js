import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import WordScorer from './Components/WordScorer';

function scoreWord(word) {
  return word.toLowerCase().split('').reduce((acc, char) => {
    const charCode = char.charCodeAt(0) - 96;
    return acc + charCode;
  }, 0);
}

function Card({ user }) {
  const { name, gender, dob, location, email, phone, picture } = user;
  const fullName = `${name.first} ${name.last}`;
  const age = new Date().getFullYear() - new Date(dob.date).getFullYear();
  const nameScore = scoreWord(fullName);

  return (
    <div className="card">
      <img src={picture.large} alt="Profile" />
      <div className="details">
        <p><strong>Name:</strong> {fullName} | <strong>Score:</strong> {nameScore}</p>
        <p><strong>Gender:</strong> {gender}</p>
        <p><strong>Age:</strong> {age}</p>
        <p><strong>Location:</strong> {location.city}, {location.country}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
      </div>
    </div>
  );
}

function App() {
  const [userData, setUserData] = useState([]);
  const [filterGender, setFilterGender] = useState(null);
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/?results=10');
        setUserData(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    setFilterGender(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  let sortedUsers = [...userData];

  if (sortOption === 'name') {
    sortedUsers.sort((a, b) => {
      const nameA = `${a.name.first} ${a.name.last}`;
      const nameB = `${b.name.first} ${b.name.last}`;
      return nameA.localeCompare(nameB);
    });
  } else if (sortOption === 'age') {
    sortedUsers.sort((a, b) => {
      const ageA = new Date().getFullYear() - new Date(a.dob.date).getFullYear();
      const ageB = new Date().getFullYear() - new Date(b.dob.date).getFullYear();
      return ageA - ageB;
    });
  }

  const filteredUsers = filterGender
    ? sortedUsers.filter((user) => user.gender === filterGender)
    : sortedUsers;

  return (
    <div className="App">
       <center><WordScorer></WordScorer></center>
      <div className="filter">
        <label htmlFor="genderFilter">Filter by Gender:</label>
        <select id="genderFilter" onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="sort">
        <label htmlFor="sortOption">Sort by:</label>
        <select id="sortOption" onChange={handleSortChange}>
          <option value="">None</option>
          <option value="name">Name</option>
          <option value="age">Age</option>
        </select>
      </div>
      <div className="container">
        {filteredUsers.map((user, index) => (
          <Card key={index} user={user} />
        ))}
      </div>
    </div>

  );
}

export default App;
