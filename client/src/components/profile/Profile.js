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
    useEffect(() => {
        //Check if user is logged in
        if (!user) {
            navigate("/login");
        }
    }, [navigate])

    async function fetchData(selectedData, id) {
        // const id = user.id;
        console.log(id)
        axios.get(`http://localhost:8000/api/profile/${selectedData}/${id}`)
            .then((response) => {
                console.log('profile', response)
                //with data - spread object and add to each from each function call, need to add a thing first when switching page
                //to show that no need for another api request
            })
            .catch(error => {
                //handle error
            });
    }

    function handlePageClick (event) {
        event.preventDefault();

    }

    // useEffect(() => {

    // }, [])
    //have option on profile to show either posts (default), liked, saved
    //make state to show each of them on demand
    //make axios get request to get data for each of them
    //either make req for posts first, then the other 2 after (save as object + spread), or request for all 3 initially, or request only on clicking each
    //lazy load images - will be using on home page too

    return (
        <div className={"profile-page"}>
            <button onClick={() => fetchData('posts', user.id)}>Posts</button>
            <button onClick={() => fetchData('likes', user.id)}>Liked</button>
            <button onClick={() => fetchData('saves', user.id)}>Saved</button>
        </div>
    )
}

export default Profile;