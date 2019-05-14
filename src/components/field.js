import React, { Component } from "react";

export default class Field extends Component{
    state={
        cells:[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
    };
    size = 4;
    componentDidMount() {
        document.addEventListener('keydown',this.handleKeyDown);
        let cells = this.makeRandomCell(this.state.cells);
        cells = this.makeRandomCell(cells);
        this.setState(cells);
    }

    initNewField() {
        let allCells = this.state.cells.map(item=>{
            return item.map(i=>{
                return(
                    <div className="cell">{i ? i :''}</div>
                )
            })
        });

        return (<div className='field'>{allCells}</div>)
    };
    makeRandomCell(arr){
        let rt = this.availableCells();
        if(this.availableCells().length){
            let randomNumber = Math.floor(Math.random()*rt.length);
            console.log(rt[randomNumber]);
            arr[rt[randomNumber].i][rt[randomNumber].j] = Math.random()<0.9 ? 2 : 4;
        }
        return arr;
    }
    availableCells (){
        let avCells = [];
        if(this.state.cells.length){
            for(let i=0; i<this.size; i++){
            for(let j=0;j<this.size;j++){
                if(this.state.cells[i][j]===0){
                    avCells.push({i,j})
                }
            }
        }
        }
        return avCells;
    }
    handleKeyDown(e) {
        const up = 38;
        const right = 39;
        const down = 40;
        const left = 37
        const n = 78;

        if (e.keyCode === up) {
           console.log('up');
        } else if (e.keyCode === right) {
            console.log('right');
        } else if (e.keyCode === down) {
            console.log('down');
        } else if (e.keyCode === left) {
            console.log('left');
        }
        // else
            // if (e.keyCode === n) {
            // this.initBoard();
        // }
    }
    render() {
        return(
            this.initNewField()
        )
    }

}