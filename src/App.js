import React ,{useEffect} from 'react';
import Chats from './Chats'
import WebcamCapture from './WebcamCapture';
import ChatView from './ChatView';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Preview from "./Preview";
import {useSelector,useDispatch} from 'react-redux';
import {selectUser,login,logout} from './features/appSlice';
import Login from './Login';
import { auth } from './firebase';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch(login({
          username:authUser.username,
          profilePic:authUser.photoURL,
          id:authUser.uid,
        }));
      }else{
        dispatch(logout());
      }
    });
  });


  return (
    <div className="app">
     <Router>
      {!user?(<Login/>):(<>
        <img src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg" 
        className="app__logo" alt=''/>
        <div className="app__body">
          <div className="app__bodyBackground">
            <Switch>
              <Route path="/chats/view">
                <ChatView/>
              </Route>
              <Route path="/chats">
                <Chats/>
              </Route>
              <Route path="/preview">
                <Preview/>
              </Route>
              <Route exact path="/">
                <WebcamCapture/>
              </Route>
            </Switch>
          </div>         
        </div>
      </>
      )}

      
    </Router>    
    </div>
  );
}

export default App;
