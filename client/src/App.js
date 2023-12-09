import React, { useState, useEffect } from "react";
import './App.css';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/message")
      .then((response) => response.json())
      .then((data) => setMessage(state => data.message));
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}

export default App
