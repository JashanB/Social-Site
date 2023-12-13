import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Login.css';

function Login ({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
    
        onLogin({ email, password });
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
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Login;