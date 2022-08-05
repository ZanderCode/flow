import React, { Component, useRef } from "react";
import { Button } from '@mui/material';

import { getDocFrom, getDocsFrom, initializeFirebaseFlows } from "./services/DatabaseService";
import { logInClient, signOutClient } from "./services/AuthService";

import PageContainer from "./components/PageContainer";
import Flow from "./components/Flow";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import "./App.css";
import { connectFirestoreEmulator } from "firebase/firestore";


class App extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
        </Routes>
      </BrowserRouter>
    );
  }

}

export class HomePage extends Component{

  constructor(props){
    super(props);

    // focused is the current Flow node(s) we are touching
    this.state = {
      focused: [null], // TODO: remove and figure out.
      scale: 0.9,
      username: null,
      loggedIn: false,
      pages: null
    }

    this.scaleFactor = 0.05;
    this.username = null;
  }

  async logIn(){
    // Imported from AuthService.js
    await logInClient(async (result,isNew)=>{
      if (isNew){
        // clean new account, set up new database for new user
        initializeFirebaseFlows(result.user.uid);
      }

      var res = null;
      await getDocFrom(result.user.uid, (data)=>{
        // Update state with logged in information
        this.setState({
          username: result.user.displayName.split(" ")[0],
          uid: result.user.uid,
          loggedIn: true,
          pages:data 
        });
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

  createPages(){
    let data = [];
    for(let i=0; i <this.state.pages.page.names.length;i++){
      data.push(<PageContainer key={"page"+i} name={this.state.pages.page.names[i]}/>);
    }
    return data;
  }

  render(){
    const mainStyle = {
      width:"100%",
      height:"100%",
      position:"absolute",
      overflow:"hidden",
      border:"1px solid black"
    };

    let renderAbleContent = [];
    if (this.state.loggedIn){
        renderAbleContent = this.createPages();
    }

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
      
        { this.state.loggedIn ?  
        <div>
          <h1 className="your-docs">Your Documents...</h1>
          <div className="pages">
            {renderAbleContent.map((comp,i)=> comp)}
          </div>
        </div> : <div></div> }

          
      </div>
    );
  }
}

export default App;
