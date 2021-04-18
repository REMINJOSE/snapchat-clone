import React,{useEffect} from 'react';
import './chatview.css';
import {selectSelectImage} from './features/appSlice';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {CountdownCircleTimer} from 'react-countdown-circle-timer';
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
            <div className="chatView__timer">
                <CountdownCircleTimer
                    isPlaying
                    duration={10}
                    strokeWidth={6}
                    size={50}
                    colors={[
                        ['#004777',0.33],
                        ['#F7B801',0.33],
                        ['#A30000',0.33],
                    ]}>
                    {({remainingTime})=>{
                        if (remainingTime===0){
                            handleExit();
                        }
                        return remainingTime;
                    }}
                </CountdownCircleTimer>
            </div>
            
        </div>
    )
}

export default ChatView
