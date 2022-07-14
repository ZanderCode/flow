import React, { Component, useRef } from "react";
import Flow from "./components/Flow";

import { Button } from '@mui/material';

import IMG from "./imgs/mush.jpg";
import Hierarchy from "./components/Hierarchy";

import { initializeApp } from "firebase/app";
import { getFirestore, query, collection, getDocs, doc, addDoc, setDoc } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export function getFirebaseConfig(){
  return {
    apiKey: "AIzaSyAwJYXxZFi3xcO9jROBramhblA_Ml6wVaQ",
    authDomain: "flow-a7455.firebaseapp.com",
    projectId: "flow-a7455",
    storageBucket: "flow-a7455.appspot.com",
    messagingSenderId: "987763281220",
    appId: "1:987763281220:web:fc375f9578ab5a92c69b11"
  };
}
const app = initializeApp(getFirebaseConfig());
const db = getFirestore(app);
export function getFirebaseApp(){
  return app;
}

const auth = getAuth();
const provider = new GoogleAuthProvider();

class App extends Component{

  constructor(props){
    super(props);

    // focused is the current Flow node(s) we are touching
    this.state = {
      focused: [null], // TODO: remove and figure out.
      scale: 0.9,
      username: null,
      loggedIn: false
    }

    this.scaleFactor = 0.05;
  }

  async logIn(){
    signOut(auth);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(result.user.uid);
        this.initializeFirebaseFlows(result.user.uid);
        this.setState({
          username: result.user.displayName,
          loggedIn: true
        });
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  async initializeFirebaseFlows(uid){
    
    try {
      const data = {
        // Each user has a Flow Page. Each Flow Page contains nodes and such.
        page: {
          // 0 : some data
          // 1 : ... 
          content: ""
        }
      }
  
      const ref = doc(db,"users", uid);
      const res = await setDoc(ref, data);  

    } catch (e) {
      console.error(e);
    }
  }

  async getDataFrom(uid){
    const q = query(collection(db, "users", uid));
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  }

  signOutClient(){
    this.setState({
      username: null,
      loggedIn: false
    });
  }

  render(){
    
    const mainStyle = {
      width:"100%",
      height:"100%",
      position:"absolute",
      overflow:"hidden",
      border:"1px solid black"
    };

    return (
      <div className="main-body" style={mainStyle}>
        <Hierarchy>
          {
          this.state.username != null ? <h1>{this.state.username}</h1> : 
          <Button variant="outlined" onClick={()=>this.logIn()}>
            Log In
          </Button>
          }
          {
          this.state.loggedIn ? 
          <Button variant="outlined" onClick={()=>this.signOutClient()}>
            Sign Out
          </Button> : <div></div>
          }
        </Hierarchy>
        <div>
        <Flow x={100} y={100}>
          <h1>Mushroom 1</h1>
          <ul>
            <li>Hair?</li>
            <li>Spore print</li>
            <li>Cap width</li>
          </ul>
        </Flow>

        <Flow x={300} y={100}>
          <h1>Mushroom 2</h1>
          <ul>
            <li>Hair?</li>
            <li>Spore print</li>
            <li>Cap width</li>
          </ul>
        </Flow>

        <Flow x={500} y={100}>
          <h1>Image Inspo</h1>
          <img src={IMG} style={{width:"150px"}} draggable="false"/>
        </Flow>

        <Flow x={300} y={500}>
          <h1>Important links</h1>
          <ol>
            <li><a href="#">death cap mushroom</a></li>
            <li><a href="#">puff ball mushroom</a></li>
            <li><a href="#">puff ball mushroom</a></li>
            <li><a href="#">other inspiration</a></li>
          </ol>
        </Flow>
        </div>

      </div>
    );
  }
}

export default App;
