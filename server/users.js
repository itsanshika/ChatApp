const users=[];

function addUser({id,name,room})
{
    name=name.trim().toLowerCase();
    room=room.trim().toLowerCase();


const existingUser=users.find((user)=> user.name===name && user.room===room);

if(existingUser)
{
    return {error:'Already existing User, Please Choose Another Namr or Room'}
}

const user={id,name,room};

users.push(user);

return {user};
}



function removeUser(userId)
{
    const ind= users.findIndex((user)=> user.id===userId);
    if(ind!==-1)
    {
        return users.filter((user)=>user.id!==userId);

    }
    
}

function getUser(id)
{
    return users.find((user)=>user.id===id);
}

function getUserRoom(room)
{
    return users.filter((user)=> user.room ===room);
}

module.exports={addUser, removeUser,getUser,getUserRoom};
