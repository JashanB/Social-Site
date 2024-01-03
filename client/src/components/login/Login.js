import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import './Login.css';

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const [isLoggedIn, setisLoggedIn] = useState(false);

    useEffect(() => {
        //Check if user is logged in
        if (isLoggedIn || props.user) {
            navigate("/");
        }
    }, [navigate, isLoggedIn])

    const handleForm = (e) => {
        setUserInfo((state) => ({
            ...state,[e.target.name]: e.target.value
        }))
    } 

    function handleSubmit(event) {
        event.preventDefault();
        if (email.length > 0 && password.length > 0) {
            const user = {
                email: email,
                password: password
            };
            axios.post(`http://localhost:8000/api/login`, user)
                .then((response) => {
                    // console.log('login', response)
                    if (response.data.user && email === response.data.user.email && password === response.data.user.password) {
                        // console.log(response.data.user);
                        // console.log(response);
                        setisLoggedIn(true);
                        props.handleLogin({...user, id: response.data.user.id})
                        //display check mark or something 
                        // navigate("/");
                    } else {
                        //show either info doesn't exist, or is incorrect
                    }
                    //if response.data undefined - show either info doesn't exist, or is incorrect
                    // if (response.data.message) setMessage(state => response.data.message)
                    //   setMessage(state => response.data.message);
                });
        }

    }


    //make post request to api with details if values arent null
    //if email and password match, sent through api confirmation, make cookie with user_id that we can use to access on all pages
    //redirect to main page
    //if no user exists with that email -> dont re-direct to signup, want to have sign up or login as options 

    //make login and sign up as options if this or that, same stuff but function to post different

    return (
        <div className={"login-page"}>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="text"
                        value={email}
                        name="email"
                        onChange={handleForm}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        name="password"
                        onChange={handleForm}
                    />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Login;