import React, { Component } from "react";

import "./App.css";
import Field from "./field.js";

const reverseY = (matrix) =>{
    let reversed=[];
    for(let i=0; i<4; i++){
        let row =[];
        for(let j=0; j<4; j++){
            row.push(matrix[3-i][j])
        }
        reversed.push(row)
    }
    return reversed
};

const rotate45 = (matrix) =>{
    let reversed=[];
    for(let i=0; i<4; i++){
        let row =[];
        for(let j=0; j<4; j++){
            row.push(matrix[3-j][i])
        }
        reversed.push(row)
    }
    return reversed
};

class App extends Component {
  state = {
    cells: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
      latestCoordinates:{}
  };
  size = 4;

  componentDidMount() {
    let {cells} = this.state;
    let cells1 = this.makeRandomCell(cells);
    this.setState(this.makeRandomCell(cells1));
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }
  makeRandomCell(data) {
    let arr = data.slice();
    let rt = this.availableCells(arr);
    if (this.availableCells(arr).length) {
      let randomNumber = Math.floor(Math.random() * rt.length);
      arr[rt[randomNumber].i][rt[randomNumber].j] = Math.random() < 0.9 ? 2 : 4;
      this.setState({latestCoordinates:{i:rt[randomNumber].i,j:rt[randomNumber].j}})

    }
    return arr;
  }
  availableCells(data) {
    let avCells = [];
    let cells = data;

    if (cells.length) {
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          if (cells[i][j] === 0) {
            avCells.push({ i, j });
          }
        }
      }
    }
    return avCells;
  }
  handleKeyDown(event) {
    const up = 38;
    const right = 39;
    const down = 40;
    const left = 37;
    let {cells} = this.state;
    if (event.keyCode === up) {
      let newState = this.moveUp(cells);
      this.setState(newState)
    } else if (event.keyCode === right) {
      let newState = this.moveRight(cells);
      this.setState({cells:newState})
    } else if (event.keyCode === down) {
      let newState = this.moveDown(cells);
      this.setState({cells:newState})
    } else if (event.keyCode === left) {
      let newState = this.moveLeft(cells);
      this.setState({cells:newState})
    }
  }
  checkStep = (arr, i,j) =>{
    let moved;
      if (arr[i][j] !== 0 && arr[i - 1][j] === 0) {
        arr[i - 1][j] = arr[i][j];
        arr[i][j] = 0;
        moved = true;
        if(i>=2){
          this.checkStep(arr,i-1,j);
          moved = true;
          if(i===3){
            this.checkStep(arr,i-2,j);
            moved = true;
          }
        }
      } else if ((arr[i][j] === arr[i - 1][j])) {
        arr[i - 1][j] = arr[i][j] + arr[i - 1][j];
        arr[i][j] = 0;
        moved = true;
      }

    return {arr,moved};
  };
  moveUp(data){
    let arr = data.slice();
    let moved = false;
      for(let j = 0; j<this.size; j++){
          for (let i = 1; i < this.size; i++) {
            let result= this.checkStep(arr,i,j);
            arr = result.arr;
            moved = result.moved;
          }
      }
  return moved ? this.makeRandomCell(arr) : arr;

  }
  moveDown(data){
    let arr = data.slice();
      let arr2 = reverseY(arr);
      let moved = false;
      for(let j = 0; j<this.size; j++){
          for (let i = 1; i < this.size; i++) {
              let result= this.checkStep(arr2,i,j);
              arr = reverseY(result.arr);
              moved = result.moved;
          }
      }
      return moved ? this.makeRandomCell(arr) : arr;
  }
  moveLeft(data){
    let arr = data.slice();

    let rotated = rotate45(arr);
      let moved = false;
      for(let j = 0; j<this.size; j++){
          for (let i = 1; i < this.size; i++) {
              let result= this.checkStep(rotated,i,j);
              arr = rotate45(rotate45(rotate45(result.arr)));
              moved = result.moved;
          }
      }
      return moved ? this.makeRandomCell(arr) : arr;
  }
  moveRight(data){
    let arr = data.slice();
      let rotated = rotate45(rotate45(rotate45(arr)));
      let moved = false;
      for(let j = 0; j<this.size; j++){
          for (let i = 1; i < this.size; i++) {
              let result= this.checkStep(rotated,i,j);
              arr = rotate45(result.arr);
              moved = result.moved;
          }
      }
      return moved ? this.makeRandomCell(arr) : arr;
    }


  render() {
   let  {cells,latestCoordinates} = this.state;
    return (
      <div className="App">
        <Field cells={cells} latest={latestCoordinates}/>
      </div>
    );
  }
}

export default App;

