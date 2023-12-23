import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import './Landing.css';

function Landing () {
  const navigate = useNavigate();
//navigate to profile
function profileNav (event) {
    event.preventDefault();
    navigate("/");
}


    
    return (
        <div className={"landing-page"}>
            <button onClick={profileNav}></button>
        </div>
    )
}
export default Landing;