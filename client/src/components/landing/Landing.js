import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import './Landing.css';

function Landing(props) {
    const [postData, setPostData] = useState({});
    const navigate = useNavigate();

    async function retrievePosts (id) {
        const response = await axios.get(`http://localhost:8000/api/landing/${id}`);
        const data = await response.data
        console.log('data', data)
        setPostData(state => ({
            ...state, ...data
        }))
    }
    console.log(postData);
    useEffect(() => {
        //Check if user is logged in
        if (!props.user) {
            navigate("/login");
        } else {    
            retrievePosts(props.user.id);
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