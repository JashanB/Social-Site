import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import './Profile.css';
import { signal } from "@preact/signals-react";

export const userData = signal();

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
        } else {
            fetchData('posts', user.id);
        }
    }, [navigate])

    async function fetchData(selectedData, id) {
        // const id = user.id;
        // console.log(id)
        axios.get(`http://localhost:8000/api/profile/${selectedData}/${id}`)
            .then((response) => {
                console.log('profile', response)
                setData((state) => ({
                    ...state, selectedData: response.data
                }) )
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
    //lazy load images
    //iterate through post data, creating a div and img for each one with an onclick function that opens the post 
    return (
        <div className={"profile-page"}>
            <button onClick={() => fetchData('posts', user.id)}>Posts</button>
            <button onClick={() => fetchData('likes', user.id)}>Liked</button>
            <button onClick={() => fetchData('saves', user.id)}>Saved</button>
        </div>
    )
}

export default Profile;