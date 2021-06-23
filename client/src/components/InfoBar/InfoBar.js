import React from 'react';
import onlineIcon from '../../Icons/onlineIcon.png';
import closeIcon from '../../Icons/closeIcon.png';
import './InfoBar.css';

function InfoBar(props)
{
    return <div className="infoBar">
    <div className="leftInnerContainer">
    <img className="onlineIcon" src={onlineIcon}   alt="online image"/>
    <h3>{props.room} </h3>
    </div>
    <div className="rightInnerContainer">
    <a href="/"><img src={closeIcon} alt="close image" /></a>
    </div>
    
    </div>
}
 export default InfoBar;