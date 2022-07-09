import React, { Component, useRef } from "react";

import "./Flow.css";

export default class Flow extends Component{

    constructor(props){
        super(props);
        this.children = props.children;
        this.state = {
            clicked:false, // To display resize options
           
            width: props.width,
            height: props.height,

            x:props.x,
            y:props.y,
            isMoving:false,
            
            zIndex: 0, // Layering

            offsetX: 0, // Drag from x click pos
            offsetY: 0,  // Drag from y click pos

            topLeftResizeVal: 0,
            topRightResizeVal: 0,
            bottomLeftResizeVal: 0,
            bottomRightResizeVal: 0,
            origResizeX:0,
            origRisizeY:0,
            isResized: false,
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
            clicked: !this.state.clicked,
        });
    }

    // OnMouseDown
    startMove = (e) =>{

        let data = {
            // Used to Calculate resizing
            origResizeX: e.clientX,
            origResizeY: e.clientY,
            origResizeW: this.state.width,
            origResizeH: this.state.height,

            offsetX: e.clientX - this.state.x,
            offsetY: e.clientY - this.state.y,
            isMoving: true,
            zIndex:1,
        }

        // Do regualar movement of Flow node
        this.setState(data);
    }

    // OnMouseUp
    endMove = () =>{
        this.setState({
            isMoving: false,
            zIndex:0, // Back a layer
            topLeftResizeVal: 0,
            topRightResizeVal: 0,
            bottomLeftResizeVal: 0,
            bottomRightResizeVal: 0,
        });
    }

    move = (e) => {

        let data = {

        }

        // For Resizing:

        // Are we touching ONLY one of resize options?
        // You shouldn't select multiple since a flow node 
        // can get really small. How would you not select 
        // all resize options with a single click, 
        // making it impossible to resize the node.

        // Top Left
        if (this.state.topLeftResizeVal == 1 && 
            this.state.topRightResizeVal == 0 && 
            this.state.bottomLeftResizeVal == 0 && 
            this.state.bottomRightResizeVal == 0){

            data = {
                x:e.clientX,
                y:e.clientY,
                width:this.state.origResizeW - (e.clientX- this.state.origResizeX),
                height:this.state.origResizeH + (this.state.origResizeY - e.clientY),
            }
            this.setState(data);

            return;
        }
        // Top Right
        if (!this.state.topLeftResizeVal &&
             this.state.topRightResizeVal &&
              !this.state.bottomLeftResizeVal &&
               !this.state.bottomRightResizeVal){

        }
        // Bottom Left
        if (!this.state.topLeftResizeVal &&
             !this.state.topRightResizeVal &&
              this.state.bottomLeftResizeVal &&
               !this.state.bottomRightResizeVal){

        }
        // Bottom Right
        if (!this.state.topLeftResizeVal &&
             !this.state.topRightResizeVal &&
              !this.state.bottomLeftResizeVal &&
               this.state.bottomRightResizeVal){

        }

        // For Regular Movement:

        if(this.state.isMoving){
            this.setState({
                // Simply move component to mouse cursor - offset = drag from click "effect"
                x:e.clientX - this.state.offsetX,
                y:e.clientY - this.state.offsetY,
            });
        }
    }

    onExit = () =>{
        this.setState({
            isMoving: false,
        });
    }

    // String formatted like so:
    // 10
    // 00
    // ...the above example means that the top left corner was selected.
    setResizePos = (four) => {
        this.setState({
            isResized:true,
            topLeftResizeVal: parseInt(four[0]),
            topRightResizeVal: parseInt(four[1]),
            bottomLeftResizeVal: parseInt(four[2]),
            bottomRightResizeVal: parseInt(four[3]),
        });
    }

    render(){

        const styleWithChildren = {
            width: this.state.isResized ? this.state.width : "fit-content",
            height: this.state.isResized ? this.state.height : "fit-content",
            padding:"10px",
            position:"absolute",
            top:this.state.y,
            left:this.state.x,
            backgroundColor:"lightgray",
            borderRadius: "10px",
            userSelect:"none",
            zIndex:this.state.zIndex,
            textOverflow:"wrap"
        };

        return (
            <div ref={this.ref} 
                style={styleWithChildren} 
                onClick={this.reveal} 
                onMouseMove={this.move} 
                onMouseDown={this.startMove} 
                onMouseUp={this.endMove}
                onMouseLeave={this.onExit}>

                {/* The resizing buttons for controlling size*/}
                {this.state.clicked ? 
                    <div className="resize">
                        <div className="resize-buffer-space"></div>
                        <div className="left-top" onMouseDown={()=>this.setResizePos("1000")}></div>
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