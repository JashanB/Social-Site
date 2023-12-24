import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import './Landing.css';

function Landing(props) {
    const navigate = useNavigate();

    //navigate to profile
    function profileNav(event) {
        event.preventDefault();
        if (props.user) {
            navigate("/profile");
        } else {
            navigate("/login");
        }
    }

    return (
        <div className={"landing-page"}>
            <button onClick={(e) => profileNav(e)}>Profile</button>
        </div>
    )
}
export default Landing;