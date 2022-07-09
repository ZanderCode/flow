import React, { Component, useRef } from "react";

import "./Flow.css";

export default class Flow extends Component{

    constructor(props){
        super(props);
        this.children = props.children;
        this.state = {
            clicked:false,
            width: props.width,
            height: props.height,
            x:props.x,
            y:props.y,
            isMoving:false
        };
    }

    // Used to get the Flow components width and height after mount
    ref = node => node && this.setState({
        width: node.getBoundingClientRect().width,
        height: node.getBoundingClientRect().height
    });

    // Shows and hides the resize options
    reveal = () =>{
        this.setState({
            clicked:!this.state.clicked
        });
    }

    startMove = () =>{
        this.setState({
            isMoving: true
        });
    }

    endMove = () =>{
        this.setState({
            isMoving: false
        });
    }

    move = (e) => {
        if(this.state.isMoving){
            this.setState({
                x:e.clientX - this.state.width/2,
                y:e.clientY - this.state.height/2,
            });
        }
    }

    render(){

        const styleWithChildren = {
            width: "fit-content",
            height: "fit-content",
            padding:"10px",
            position:"absolute",
            top:this.state.y,
            left:this.state.x,
            backgroundColor:"lightgray"
        };

        return (
            <div ref={this.ref} style={styleWithChildren} onClick={this.reveal} onMouseMove={this.move} onMouseDown={this.startMove} onMouseUp={this.endMove}>

                {/* The resizing buttons for controlling size*/}
                {this.state.clicked ? 
                    <div className="resize">
                        <div className="left-top"></div>
                        <div className="right-top"></div>
                        <div className="right-bottom"></div>
                        <div className="left-bottom"></div>
                    </div>
                : <div></div>}

                {/* The nested content of the Flow class */}
                {this.children}

            </div>
        );
    }
}