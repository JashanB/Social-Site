import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import './Landing.css';

function Landing(props) {
    const navigate = useNavigate();

    useEffect(() => {
        //Check if user is logged in
        if (!props.user) {
            navigate("/login");
        }
    }, [navigate])

    //navigate to profile
    function profileNav(event) {
        event.preventDefault();
        if (props.user) {
            navigate("/profile");
        } else {
            navigate("/login");
        }
    }

    //handle logout
    const handleLogout = () => {
        // Remove the 'user' cookie at logout
        props.removeCookie('user');
        // Redirect to the login page or wherever you need after logout
        navigate('/login');
    };

    return (
        <div className={"landing-page"}>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={(e) => profileNav(e)}>Profile</button>
        </div>
    )
}
export default Landing;