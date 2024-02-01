import React, { useState, useEffect } from "react";
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from '../login'
import SignUp from '../signUp'
import Profile from '../profile'
import Landing from '../landing'
import { CookiesProvider, useCookies } from "react-cookie";

function App() {
  // const [email, setEmail] = useState("clara@lighthouse.com");
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  // const navigate = useNavigate();

  //set cookie on login
  function handleLogin(user) {
    setCookie("user", user, { path: "/" });
    console.log('logged in!')
  }
  console.log('cookie', cookies.user)
  
  //remove cookie on site closing for dev
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

  //User logged in - retrieve posts from friends
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
        <Routes>
          <Route path="/login" element={<Login user={cookies.user} handleLogin={handleLogin} />}></Route>
          <Route path="/signup" element={<SignUp user={cookies.user} handleLogin={handleLogin} />}></Route>
          <Route path="/profile" element={<Profile user={cookies.user} />}></Route>
          <Route path="/" element={<Landing removeCookie={removeCookie} user={cookies.user} />}></Route>
          <Route path='*' element={<Navigate to='/' user={cookies.user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
