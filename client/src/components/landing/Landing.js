import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import './Landing.css';
import PostItem from '../postItem/PostItem';

function Landing(props) {
    const [postData, setPostData] = useState({});
    const navigate = useNavigate();

    //api request to get all posts from friends to populate home page
    async function retrievePosts(id) {
        const response = await axios.get(`http://localhost:8000/api/landing/${id}`);
        const data = await response.data
        setPostData(state => ({
            ...state, ...data
        }))
    }
    // console.log(postData);

    //Redirect user if not logged in
    useEffect(() => {
        //Check if user is logged in
        if (!props.user) {
            navigate("/login");
        } else {
            //load home page data
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

    //create post items
    function createFriendPosts(data) {
        console.log('called')
        const friendPosts = Object.keys(data).map(function (key) {
            console.log(data[key]['img'])
            return (
                <PostItem
                    key={key}
                    title={data[key]['title']}
                    content={data[key]['content']}
                    img={data[key]['img']}
                    img_small={data[key]['img_small']}
                />
            )
        })
        return friendPosts;
    }

    return (
        <div className="landing-page">
            <button onClick={handleLogout}>Logout</button>
            <button onClick={(e) => profileNav(e)}>Profile</button>
            <div className='posts'>
                {createFriendPosts(postData)}
            </div>
        </div>
    )
}
export default Landing;