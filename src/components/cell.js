import React, { Component } from "react";


export default class Cell extends Component{
    // constructor(props){
    //     super(props)
    //     this.size = 4;
    //
    // }

    size =4;

    render() {
        for(let i=0; i<this.props; i++){
            return(
                <div className={'cell'}>!!!</div>
            )
        }

    }

}
