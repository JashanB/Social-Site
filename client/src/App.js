import React, { useState, useEffect } from "react";
import './App.css';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("clara@lighthouse.com")
  // console.log(message)
  useEffect(() => {
    // axios.get("http://localhost:8000/message")
    // .then((response) => setMessage(state => response.data.message));
    axios.get("http://localhost:8000/api")
      .then((response) => {
        console.log('this', response)
        // if (response.data.message) setMessage(state => response.data.message)
        setMessage(state => response.data.message);
      });
    axios.get(`http://localhost:8000/api/users/${email}`)
      .then((response) => {
        console.log('that', response)
        // if (response.data.message) setMessage(state => response.data.message)
        // setMessage(state => response.data.message)
      });
  }, []);

  return (
    <div className="App">
    </div>
  );
}

export default App
