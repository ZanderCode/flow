import React, { Component, useRef } from "react";
import Flow from "./components/Flow";

import {useDispatch} from "react-redux";

class App extends Component{

  constructor(props){
    super(props);

    // focused is the current Flow node(s) we are touching
    this.state = {
      focused: [null],
    }

    this.doSomething = this.doSomething.bind(this);
  }

  doSomething(item){
    console.log(item);
  }

  render(){
    
    const mainStyle = {
      width:"100%",
      height:"100%",
      position:"absolute",
      backgroundColor:"gray",
    };

    return (
      <div className="main-body" style={mainStyle}>
        <Flow x={100} y={100}>
          <h1>Mushroom 1</h1>
          <ul>
            <li>Hair?</li>
            <li>Spore print</li>
            <li>Cap width</li>
          </ul>
        </Flow>
      </div>
    );
  }
}

export default App;
