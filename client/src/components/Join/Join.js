import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './Join.css'

function Join()
{
const [name,setName]=useState('');
const [room,setRoom]=useState('');

function nameHandler(event)
{
    setName(event.target.value);
}

function roomHandler(event)
{
    setRoom(event.target.value);
}


return <div className="joinOuterContainer">
<div className="joinInnerContainer">
  <h1 className="heading">Join</h1>
  <div>
    <input placeholder="Name" className="joinInput" type="text" onChange={nameHandler} value={name} />
  </div>
  <div>
    <input placeholder="Room" className="joinInput mt-20" type="text" onChange={roomHandler} value={room} />
  </div>
  <Link  onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
    <button className={'button mt-20'} type="submit">Sign In</button>
  </Link>
</div>
</div>

};
export default Join;