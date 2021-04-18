import React,{useEffect} from 'react';
import './chatview.css';
import {selectSelectImage} from './features/appSlice';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import 
function ChatView() {
    const selectedImage = useSelector(selectSelectImage) 
    const history =useHistory();

    const handleExit =()=>{
        history.replace('./chats')
    };

    useEffect(()=>{
        if  (!selectedImage){
            handleExit();
        }
    },[selectedImage]);

    return (
        <div className="chatview">
            <img onClick={handleExit} src={selectedImage} alt=''/>
        </div>
    )
}

export default ChatView
