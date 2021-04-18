import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import './Chat.css';
import {Avatar} from '@material-ui/core';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import ReactTimeago from 'react-timeago';
import {selectImage} from './features/appSlice';
import {useHistory} from 'react-router-dom';
import {db} from './firebase';
function Chat({id,username,timestamp,read,imageUrl,profilepic}) {
        const dispatch = useDispatch();
        const history = useHistory();
        const handleOpenChat = ()=>{
            console.log(imageUrl)
            if(!read){
                dispatch(selectImage(imageUrl));
                db.collection('posts').doc(id).set(
                    {
                        read:true,
                    },
                    {
                        merge:true
                    }
                );
                history.push('/chats/view');
            }
        };
     console.log(username);
    return (
        <div onClick={handleOpenChat} className='chat'>
            <Avatar className='chat__avatar' src={profilepic}/>
            <div className="chat__info">
                <h4>
                    {username}
                </h4>
                <p>Tap to view -<ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} /> </p>
            </div>
            {!read&&<StopRoundedIcon className="chat__readIcon"/>}
        </div>
    )
}
export default Chat
