import React , {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {resetCameraImage, selectCameraImage} from './features/cameraSlice';
import {useHistory} from 'react-router-dom';
import './Preview.css'
import CloseIcon from '@material-ui/icons/Close';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';
import {v4 as uuid} from 'uuid';
import {db,storage} from './firebase';
import firebase from 'firebase';
function Preview() {
    const history = useHistory();
    const cameraImage = useSelector(selectCameraImage);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        if(!cameraImage){
            history.replace('/');
        }
    },[cameraImage, history]);

    const closePreview = ()=>{
        dispatch(resetCameraImage());
    };
    const handleSendNow = ()=>{
        const id = uuid();
        const uploadTask = storage.ref(`posts/${id}`).putString(cameraImage,'data_url');
        uploadTask.on('state_changed',null,
        (error)=>{
            //Error Function
            console.log(error);
        },
        ()=>{
            //Complete Function
            storage.ref('posts').child(id).getDownloadURL()
            .then((url)=>{
                db.collection('posts').add({
                    imageUrl:url,
                    username: 'honeybadger',
                    read:false,
                    //profilepic,
                    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                });
                history.replace('/chats');
            });
        });
    };
    return (
        <div className='preview'>
            <CloseIcon onClick = {closePreview} className = 'preview__close' />
            <div className='preview_toolbarRight'>
                <TextFieldsIcon />
                <CreateIcon />
                <NoteIcon />
                <MusicNoteIcon />
                <AttachFileIcon />
                <CropIcon />
                <TimerIcon />
            </div>
            <img src={cameraImage} alt=''></img>            
            <div className="preview__footer" onClick={handleSendNow}>
                <h2>Send Now</h2>
                <SendIcon  className="preview__sendIcon"/>
            </div>
        </div>
    )
}


export default Preview
