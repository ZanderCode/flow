import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';
import React, { Component, createRef } from "react";
import "./Flow.css";

export default class Flow extends Component{

    constructor(props){
        super(props);
        this.children = props.children;
        this.state = {
            clicked:false, // To display resize and rotation options
           
            width: props.width??0,
            height: props.height??0,

            x:props.x,
            y:props.y,
            isMoving:false,
            
            zIndex: 0, // Layering

            offsetX: 0, // Drag from x click pos
            offsetY: 0,  // Drag from y click pos

            // Flags for resizing
            topLeftResizeVal: 0,
            topRightResizeVal: 0,
            bottomLeftResizeVal: 0,
            bottomRightResizeVal: 0,
            origResizeX:0,
            origRisizeY:0,
            origResizeW:0,
            origRisizeH:0,

            isResized: false,
            mouseUp:false,

            isRotating: false,
            rotMagnet:false,
            rot: 0,

            moveMagnet: false,
        };

        this.MAGNET = 20;
    }

    // Used to get the Flow components width and height after mount
    ref = node => node && this.setState({
        width: node.getBoundingClientRect().width,
        height: node.getBoundingClientRect().height
    });

    componentDidMount(){
        // Listeners for ctrl key magnet effect
        window.addEventListener("keydown", this.keyDown, true);
        window.addEventListener("keyup", this.keyUp, true);
        window.addEventListener("mouseup", this.endMove, true);
    }

    keyDown = (e) =>{
        // CTRL key = 17 which initates magnet effects
        if (e.keyCode === 17 && this.state.isRotating) {
            this.setState({
                rotMagnet:true,
            })
        }
        if (e.keyCode === 17 && this.state.isMoving) {
            this.setState({
                moveMagnet:true,
            })
        }
    }

    
    keyUp = (e) =>{
        // CTRL key = 17
        if (e.keyCode === 17 && this.state.isRotating) {
            this.setState({
                rotMagnet:false,
            })
        }
        if (e.keyCode === 17 && this.state.isMoving) {
            this.setState({
                moveMagnet:false,
            })
        }
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

            mouseUp:false,
            clicked:true
        }

        // Do regualar movement of Flow node
        this.setState(data);
    }

    // OnMouseUp
    endMove = () =>{
        this.setState({
            mouseUp:true,
            isMoving: false,
            zIndex:0, // Back a layer
            topLeftResizeVal: 0,
            topRightResizeVal: 0,
            bottomLeftResizeVal: 0,
            bottomRightResizeVal: 0,
            rotMagnet:false,
            moveMagnet:false,
            isRotating:false
        });
    }

    unfocus = () => {
        this.setState({
            clicked:false,
            isMoving:false,
            isRotating:false
        });
    }

    move = (e) => {

        if (this.state.mouseUp){
            return;
        }

        let data = {}

        // For Rotating:

        if (this.state.isRotating){

            // angle between mouse and Flow center
            let rotash = Math.atan( (e.clientX-(this.state.x+(this.state.width)))/(e.clientY-(this.state.y+(this.state.height))) );
            let degree = (rotash * (180 / Math.PI) * -1);
            data = {
                // The angle between the cursor and center of node
                rot: degree
            }

            if (this.state.rotMagnet){
                data = {
                    // The angle between the cursor and center of node, but rounded to nearest factor of this.MAGNET
                    // hence the "magneting" to grid effect
                    rot: Math.floor(degree / this.MAGNET) * this.MAGNET,
                }
            }

            this.setState(data);
            return;
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
        if (this.state.topLeftResizeVal == 0 &&
             this.state.topRightResizeVal == 1 &&
              this.state.bottomLeftResizeVal == 0 &&
               this.state.bottomRightResizeVal == 0){

            data = {
                x:e.clientX-this.state.width,
                y:e.clientY,
                width:this.state.origResizeW + (e.clientX- this.state.origResizeX),
                height:this.state.origResizeH + (this.state.origResizeY - e.clientY),
            }
            this.setState(data);

            return;
        }
        // Bottom Left
        if (this.state.topLeftResizeVal == 0 &&
             this.state.topRightResizeVal == 0 &&
              this.state.bottomLeftResizeVal == 1 &&
               this.state.bottomRightResizeVal == 0){
                data = {
                    x:e.clientX,
                    y:e.clientY-this.state.height,
                    width:this.state.origResizeW - (e.clientX- this.state.origResizeX),
                    height:this.state.origResizeH - (this.state.origResizeY - e.clientY),
                }
                this.setState(data);
    
                return;
        }
        // Bottom Right
        if (this.state.topLeftResizeVal == 0 &&
             this.state.topRightResizeVal == 0 &&
              this.state.bottomLeftResizeVal == 0 &&
               this.state.bottomRightResizeVal == 1){
                data = {
                    x:e.clientX-this.state.width,
                    y:e.clientY-this.state.height,
                    width:this.state.origResizeW + (e.clientX - this.state.origResizeX),
                    height:this.state.origResizeH + (e.clientY - this.state.origResizeY),
                }
                this.setState(data);
    
                return;
        }


        // For Regular Movement:

        if(this.state.isMoving){

            if (this.state.moveMagnet){
                data = {
                    // The angle between the cursor and center of node
                    x: Math.floor((e.clientX - (this.state.width/2)) / this.MAGNET) * this.MAGNET,
                    y: Math.floor((e.clientY - (this.state.height/2)) / this.MAGNET) * this.MAGNET,
                }
                this.setState(data);
                return;
            }


            this.setState({
                clicked:false,
                // Simply move component to mouse cursor - offset = drag from click "effect"
                x:e.clientX - this.state.offsetX,
                y:e.clientY - this.state.offsetY,
            });
        }
    }

    onExit = () =>{
        this.setState({
            isMoving: false,
            isRotating: false
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
            isRotating:false
        });
    }

    startRotation = () => {
        this.setState({
            isRotating: true
        });
    }

    stopRotation = () => {
        this.setState({
            isRotating: false
        });
    }

    render(){

        const styleWithChildren = {
            width: this.state.isResized ? this.state.width : "fit-content",
            height: this.state.isResized ? this.state.height : "fit-content",
            position:"absolute",
            top:this.state.y,
            left:this.state.x,
            backgroundColor:"white",
            border:"1px solid black",
            borderRadius: "5px",
            userSelect:"none",
            zIndex:this.state.zIndex,
            textOverflow:"wrap",
            transform: "rotate(" + this.state.rot  + "deg)"
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
                        <div className="resize-buffer-space" onClick={this.unfocus}></div>
                        <div className="left-top resize-hover" onMouseDown={()=>this.setResizePos("1000")}></div>
                        <div className="right-top resize-hover" onMouseDown={()=>this.setResizePos("0100")}></div>
                        <div className="left-bottom resize-hover" onMouseDown={()=>this.setResizePos("0010")}></div>
                        <div className="right-bottom resize-hover" onMouseDown={()=>this.setResizePos("0001")}></div>
                    </div>
                : <div></div>}

                {/* The rotating buttons for controlling size*/}
                {this.state.clicked ? 
                    <div className="rotate" >
                        <div className="right-top-rotate rotate-hover" onMouseDown={this.startRotation} onMouseUp={this.stopRotation}>
                            <ChangeCircleRoundedIcon/>
                        </div>
                    </div>
                : <div></div>}

                {/* The nested content of the Flow class */}
                {this.children}

            </div>
        );
    }
}