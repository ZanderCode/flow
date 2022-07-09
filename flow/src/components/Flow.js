import React, { Component } from "react";

import "./Flow.css";

export default class Flow extends Component{
    constructor(props){
        super(props);
        this.x = props.x;
        this.y = props.y;
        this.width = props.width;
        this.height = props.height;
        this.children = props.children;

        this.state = {
            clicked:false
        };
    }

    clicked(){
        this.setState({
            clicked:!this.state.clicked
        });
    }

    render(){

        const styleWithChildren = {
            width: "fit-content",
            height: "fit-content",
            padding:"10px",
            position:"absolute",
            top:this.y,
            left:this.x,
            backgroundColor:"lightgray"
        };

        return (
            <div style={styleWithChildren} onClick={this.clicked()}>
                {this.state.clicked ? <Resize /> : <div></div>}
                {this.children}
            </div>
        );
    }
}

export class Resize extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="resize">
                <div className="left-top"></div>
                <div className="right-top"></div>
                <div className="right-bottom"></div>
                <div className="left-bottom"></div>
            </div>
        );
    }
}