import React, { Component } from "react";
import Flow from "./components/Flow";

class App extends Component{

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
          <h1>Alex Lamarche</h1>
        </Flow>
      </div>
    );
  }
}

export default App;
