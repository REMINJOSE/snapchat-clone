import React,{useRef,useCallback,useState} from 'react'
import Webcam from 'react-webcam'; 
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import {setCameraImage} from './features/cameraSlice';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import './WebcamCapture.css';
import useWindowDimensions from './useWindowDimensions';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}


function WebcamCapture() {

    const { height, width } = useWindowDimensions();
    const videoConstraints = {
        width:width,
        height:height-150,
        facingMode: 'user',
    };
    const webcamRef = useRef(null);
    const dispatch = useDispatch();    
    const history = useHistory();
    const handleCapture = useCallback(()=>{
        const imagesrc = webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imagesrc));
       
        history.push('/preview');
    },[webcamRef]);
    return (
        <div className="webcamCapture">
            <Webcam 
                audio={false} 
                height={videoConstraints.height}
                ref = {webcamRef}
                screenshotFormat= "image/jpeg"
                width={videoConstraints.width}
                videoConstraints = {videoConstraints}
            />
            <RadioButtonUncheckedIcon className="webcamCapture__button" onClick={handleCapture}
                fontSize = "large"
            ></RadioButtonUncheckedIcon>           
        </div>
    )
}
export default WebcamCapture
