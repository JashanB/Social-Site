import React, { useState, useEffect } from "react";
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../login'
import { CookiesProvider, useCookies } from "react-cookie";


function App() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("clara@lighthouse.com");
  const [cookies, setCookie] = useCookies(["user"]);

  function handleLogin(user) {
    setCookie("user", user, { path: "/" });
  }
  console.log(cookies.user)
  // console.log(message)
  // useEffect(() => {
  //   // axios.get("http://localhost:8000/message")
  //   // .then((response) => setMessage(state => response.data.message));
  //   // axios.get("http://localhost:8000/api")
  //   //   .then((response) => {
  //   //     console.log('this', response)
  //   //     // if (response.data.message) setMessage(state => response.data.message)
  //   //     setMessage(state => response.data.message);
  //   //   });
  //   // axios.get(`http://localhost:8000/api/users/${email}`)
  //   //   .then((response) => {
  //   //     console.log('that', response)
  //       // if (response.data.message) setMessage(state => response.data.message)
  //       // setMessage(state => response.data.message)
  //     });
  // }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login user={cookies.user} handleLogin={handleLogin} />}></Route>
          <Route path="/" element={<h1></h1>}></Route>
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
