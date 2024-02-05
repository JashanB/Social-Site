import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import './Login.css';

function Login(props) {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    //user.value.email 
    const [user, setUser] = useState({
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
        setUser((state) => ({
            ...state,[e.target.name]: e.target.value
        }))
    } 
    // console.log("user", user)
    function handleSubmit(event) {
        event.preventDefault();
        if (user.email.length > 0 && user.password.length > 0) {
            // const user = {
            //     email: email,
            //     password: password
            // };
            axios.post(`http://localhost:8000/api/login`, user)
                .then((response) => {
                    // console.log('login', response)
                    if (response.data.user && user.email === response.data.user.email && user.password === response.data.user.password) {
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

    //make login and sign up as options if this or that, same stuff but function to post different

    return (
        <div className={"login-page"}>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="text"
                        value={user.email}
                        name="email"
                        onChange={handleForm}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={user.password}
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