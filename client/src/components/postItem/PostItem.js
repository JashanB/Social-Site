import React, { useEffect, useState } from 'react'
import './PostItem.css';


function PostItem (props) {

    return (
        <div className="post-item" key={props.title}>
            <h2>{props.title}</h2>
            <img src={require(`../../../../imgs/${props.img}`)}></img>
        </div>
    )
}

export default PostItem;