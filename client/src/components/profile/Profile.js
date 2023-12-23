import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import './Profile.css';

function Profile({ user }) {
    const navigate = useNavigate();
    const pages = ['posts', 'likes', 'saves']
    const [page, setPage] = useState(['posts']);
    const [data, setData] = useState({});

    // Check if user is logged in
    if (!user) {
        navigate('/login');
        return null; // Render nothing while redirecting
    }

    async function fetchData(selectedData, url) {
        axios.post(`http://localhost:8000/api/createuser`, user)
            .then((response) => {
                console.log('create', response)
                if (response.data.user && response.data.user.email && response.data.user.password) {
                    console.log(response.data.user);
                    // console.log(response);
                    setisLoggedIn(true);
                    props.handleLogin({ ...user, id: response.data.user.id })
                    //display check mark or something 
                    // navigate("/");
                } else {
                    //show either info doesn't exist, or there was an error
                }
            })
            .catch(error => {

            });
    }

    useEffect(() => {

    }, [])
    //have option on profile to show either posts (default), liked, saved
    //make state to show each of them on demand
    //make axios get request to get data for each of them
    //either make req for posts first, then the other 2 after (save as object + spread), or request for all 3 initially, or request only on clicking each
    //lazy load images - will be using on home page too

    return (
        <div className={"profile-page"}>

        </div>
    )
}

export default Profile;