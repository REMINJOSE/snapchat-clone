import React,{useState,useEffect} from 'react';
import './Chats.css';
import Chat from './Chat';
import {Avatar} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon  from '@material-ui/icons/ChatBubble';
import {db} from './firebase';
import {useSelector} from 'react-redux';
import {selectUser,resetCameraImage} from './features/appSlice';
import {auth} from './firebase';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
function Chats() {
    const [posts,setPosts] = useState([]);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(()=>{
        db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>
            setPosts(snapshot.docs.map(doc=>(
                {
                    id:doc.id,
                    data:doc.data(),

                })
            ))
        )
        console.log(posts);
    },[]);

    const handleTakeSnap=()=>{
        dispatch(resetCameraImage());
        history.push('/');
    };

    return (
        <div className='chats'>
            <div className="chats__header">
                <Avatar src={user.profilePic} onClick={()=>auth.signOut()} 
                className="chats__avatar"></Avatar>
                <div className="chats__search">
                    <SearchIcon className="chats__searchIcon"/>
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
            <RadioButtonUncheckedIcon className='chats__takePicIcon' onClick={handleTakeSnap} fontSize = 'large'/>
        </div>
    )
}

export default Chats
