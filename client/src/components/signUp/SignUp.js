import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import './SignUp.css';

function SignUp(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDOB] = useState("");
    const navigate = useNavigate();
    const [isLoggedIn, setisLoggedIn] = useState(false);

    useEffect(() => {
        //Check if user is logged in
        if (isLoggedIn || props.user) {
            navigate("/");
        }
    }, [navigate, isLoggedIn])

    function handleSubmit(event) {
        event.preventDefault();
        if (email.length > 0 && password.length > 0 && dob.length > 0) {
            const user = {
                email: email,
                password: password,
                dob: dob
            };
            //need to create user with credentials, then send response if successful 
            axios.post(`http://localhost:8000/api/createuser`, user)
                .then((response) => {
                    console.log('create', response)
                    if (response.data.user && response.data.user.email && response.data.user.password) {
                        console.log(response.data.user);
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
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>    
                <br />
                <label>
                    DOB:
                    <input
                        type="date"
                        value={dob}
                        min="1900-01-01" 
                        max="2023-12-31"
                        onChange={(e) => setDOB(e.target.value)}
                    />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default SignUp;