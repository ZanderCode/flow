import React, { Component, useRef } from "react";
import Flow from "./components/Flow";

import { Button } from '@mui/material';

import "./App.css";

import { getDocFrom, getDocsFrom, initializeFirebaseFlows } from "./services/DatabaseService";
import { logInClient, signOutClient } from "./services/AuthService";
import PageContainer from "./components/PageContainer";

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
        username: result.user.displayName.split(" ")[0],
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

        <div className="header">
            <div className="header-centerable">
              {this.state.username != null ? <div className="avatar"></div> : <div></div>}
              {this.state.username != null ? <h2 className="header-text">{this.state.username}</h2> : <div></div>}
              {this.state.username == null ? <Button variant="contained" color="primary" onClick={()=>this.logIn()}>Log In</Button> : 
              <Button variant="contained" color="primary" onClick={()=>this.signOut()}>Log Out</Button>}
            </div>
        </div>
      
        <h1 className="your-docs">Your Documents...</h1>
        <div className="pages">
          <PageContainer img={"img/path"} />
          <PageContainer img={"img/path"} />
          <PageContainer img={"img/path"} />
          <PageContainer img={"img/path"} />
          <PageContainer img={"img/path"} />
          <PageContainer img={"img/path"} />
          <PageContainer img={"img/path"} />
          <PageContainer img={"img/path"} />
          <PageContainer img={"img/path"} />
          <PageContainer img={"img/path"} />
          <PageContainer img={"img/path"} />
          <PageContainer img={"img/path"} />
          <PageContainer img={"img/path"} />
        </div>

      </div>
    );
  }
}

export default App;
