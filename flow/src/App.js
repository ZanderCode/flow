import React, { Component, useRef } from "react";
import Flow from "./components/Flow";

import { Button } from '@mui/material';

import IMG from "./imgs/mush.jpg";

import { getDocFrom, getDocsFrom, initializeFirebaseFlows } from "./services/DatabaseService";
import { logInClient, signOutClient } from "./services/AuthService";

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
    this.username = null;
  }

  async logIn(){
    // Imported from AuthService.js
    await logInClient((result,isNew)=>{
      if (isNew){
        // clean new account
        initializeFirebaseFlows(result.user.uid);
      }

      // This user has pages?
      getDocsFrom(result.user.uid, (data)=>{
        data.forEach((data)=>{
          console.log(data)
        })
      });

      this.setState({
        username: result.user.displayName,
        uid: result.user.uid,
        loggedIn: true
      });

    });
  }


  async signOut (){
    // Imported from AuthService.js
    await signOutClient(()=>{
      this.setState({
        username: null,
        loggedIn: false
      });
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

        {this.state.username != null ? <h1>{this.state.username}</h1> : <h1>No user</h1>}
        {this.state.username == null ? 
        <Button variant="outlined" onClick={()=>this.logIn()}>Log In</Button> : 
        <Button variant="outlined" onClick={()=>this.signOut()}>Sign Out</Button>}

        

      </div>
    );
  }
}

export default App;
