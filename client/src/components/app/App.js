import React, { useState, useEffect } from "react";
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from '../login'
import SignUp from '../signUp'
import Profile from '../profile'
import { CookiesProvider, useCookies } from "react-cookie";

function App() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("clara@lighthouse.com");
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  // const navigate = useNavigate();

  //set cookie on login
  function handleLogin(user) {
    setCookie("user", user, { path: "/" });
    console.log('logged in!')
  }
  console.log(cookies.user)
  
  //remove cookie on site closing
  useEffect(() => {
    const handleUnload = () => {
      // Remove the 'user' cookie when the site is closed
      removeCookie('user', { path: '/' });
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [removeCookie]);

  //handle logout
  const handleLogout = () => {
    // Remove the 'user' cookie at logout
    removeCookie('user');
    // Redirect to the login page or wherever you need after logout
    // navigate('/login');
  };


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

  //sign in page
  return (
    <Router>
      <div className="App">
      <button onClick={handleLogout}>Logout</button>
        <Routes>
          <Route path="/login" element={<Login user={cookies.user} handleLogin={handleLogin} />}></Route>
          <Route path="/signup" element={<SignUp user={cookies.user} handleLogin={handleLogin} />}></Route>
          <Route path="/profile" element={<Profile user={cookies.user} />}></Route>
          <Route path="/" element={<h1></h1>}></Route>
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
