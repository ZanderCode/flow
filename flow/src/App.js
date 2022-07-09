import React, { Component, useRef } from "react";
import Flow from "./components/Flow";

import {useDispatch} from "react-redux";

import IMG from "./imgs/mush.jpg";

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
    );
  }
}

export default App;
