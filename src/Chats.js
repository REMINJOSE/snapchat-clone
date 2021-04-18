import React,{useState,useEffect} from 'react';
import './Chats.css';
import Chat from './Chat';
import {Avatar} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon  from '@material-ui/icons/ChatBubble';
import {db} from './firebase'
function Chats() {
    const [posts,setPosts] = useState([]);
    useEffect(()=>{
        db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>
            setPosts(snapshot.docs.map(doc=>(
                {
              id:doc.id,
              data:doc.data(),

            })
        )))
        console.log(posts);
    },[]);
    return (
        <div className='chats'>
            <div className="chats__header">
                <Avatar className="chats__avatar"></Avatar>
                <div className="chats__search">
                    <SearchIcon />
                    <input type="text" placeholder="friends"/>
                </div>
                <ChatBubbleIcon className="chats__chatIcon"/>
            </div>
            <div className="chats__post">
               {posts.map(({id,data:{profilepic,username,timestamp,imageUrl, read}})=>(
                   <Chat 
                    key={id}
                    id={id}
                    username={username}
                    timestamp={timestamp}
                    imageUrl={imageUrl}
                    read={read}
                    profilepic={profilepic}
                   ></Chat>
               ))} 
            </div>
        </div>
    )
}

export default Chats
