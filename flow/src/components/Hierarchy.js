import React, { Component } from "react";
import "./Hierarchy.css";

class Hierarchy extends Component{
    constructor(props){
        super(props);
        this.children = props.children;
    }
    render(){
        return(
            <div className="hierarchy">
                {this.children}
            </div>
        );
    }
}

export default Hierarchy;