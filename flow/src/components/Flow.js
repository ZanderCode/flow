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
            isMoving:false,
            zIndex: 1, // Layering
            offsetX: 0, // Drag from clickX
            offsetY: 0  // Drag from clickY
        };
    }

    // Used to get the Flow components width and height after mount
    ref = node => node && this.setState({
        width: node.getBoundingClientRect().width,
        height: node.getBoundingClientRect().height
    });

    // Shows and hides the resize options
    // Also "unfocuses the data" since it changes its layer
    // TODO: Potensh' Layering subsystem re-design?
    reveal = () =>{

        let data = {
            clicked: !this.state.clicked,
        }

        this.setState(data);
    }

    startMove = (e) =>{
        this.setState({
            // Set the inital offset for "Drag from clickX" above
            // Set the inital offset for "Drag from clickY" above
            offsetX: e.clientX - this.state.x,
            offsetY: e.clientY - this.state.y,
            isMoving: true,
        });
    }

    endMove = () =>{
        this.setState({
            isMoving: false,
        });
    }

    move = (e) => {
        if(this.state.isMoving){
            this.setState({
                // Simply move component to mouse cursor - offset = drag from click "effect"
                x:e.clientX - this.state.offsetX,
                y:e.clientY - this.state.offsetY,
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
            backgroundColor:"lightgray",
            borderRadius: "10px",
            userSelect:"none",
            zIndex:this.state.zIndex
        };

        return (
            <div ref={this.ref} 
                style={styleWithChildren} 
                onClick={this.reveal} 
                onMouseMove={this.move} 
                onMouseDown={this.startMove} 
                onMouseUp={this.endMove}>

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