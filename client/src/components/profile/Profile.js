import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import './Profile.css';

function Profile (props) {
    const [page, setPage] = useState(['posts']);
    const [data, setData] = useState({});

    async function fetchData (data) {
        
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