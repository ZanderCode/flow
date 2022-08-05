import React, { Component } from "react";
import "./PageContainer.css";


class PageContainer extends Component{
    constructor(props){
        super(props)
        this.isNew = props.isNew??true;
        this.imagePath = props.imagePath??"";
        this.path = props.path??"";
        this.name = props.name??"No File Name";
    }

    render(){
        return(
            <div className="page-container">
                {this.isNew ? <img className="default-mush" src="mushroom.jpg" alt="clip art outline of mushroom"/> 
                : <img src={this.path} alt="clip art outline of mushroom"/>}
                <p className="page-title">{this.name}</p>
            </div>
        );
    }
}

export default PageContainer;