import React, { Component } from "react";
import "./App.css";
import Field from "./field.js";

// const rt = (arr,i,j) =>{
//   if (arr[i][j] !== 0 && arr[i - 1][j] === 0) {
//     arr[i - 1][j] = arr[i][j];
//     arr[i][j] = 0;
//   } else if ((arr[i][j] === arr[i - 1][j])) {
//     arr[i - 1][j] = arr[i][j] + arr[i - 1][j];
//     arr[i][j] = 0;
//   }
//   return arr;
// };
class App extends Component {
  state = {
    cells: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],

  };
  size = 4;
  rrr = [];
  componentDidMount() {
    let {cells} = this.state;
    let cells1 = this.makeRandomCell(cells);
    this.setState(this.makeRandomCell(cells1));
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }
  makeRandomCell(data) {
    let arr = data.slice();
    let rt = this.availableCells();
    if (this.availableCells().length) {
      let randomNumber = Math.floor(Math.random() * rt.length);
      arr[rt[randomNumber].i][rt[randomNumber].j] = Math.random() < 0.9 ? 2 : 4;
    }
    return arr;
  }
  availableCells() {
    let avCells = [];
    let {cells} = this.state;

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
  makeCopy(obj){
   return obj.slice()
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
      this.setState(newState)
    } else if (event.keyCode === down) {
      let newState = this.moveDown(cells);
      this.setState(newState)
    } else if (event.keyCode === left) {
      let newState = this.moveLeft(cells);
      this.setState(newState)
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
        if(i>=3){
          this.checkStep(arr,i-2,j)
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
      console.log(moved);
  return moved ? this.makeRandomCell(arr) : arr;

  }
  moveDown(data){
    let arr = data.slice();
    let k =0;
    while (k < this.size - 1) {
      for (let i = this.size - 2; i >= 0; i--) {
        for (let j = 0; j < this.size; j++) {
          if (arr[i][j] !== 0 && arr[i + 1][j] === 0) {
            arr[i + 1][j] = arr[i][j];
            arr[i][j] = 0;
          } else if (arr[i][j] === arr[i + 1][j]) {
            arr[i + 1][j] = arr[i][j] + arr[i + 1][j];
            arr[i][j] = 0;
          }
        }
      }
      k++;
    }
    this.makeRandomCell(arr);
    return arr;
  }
  moveLeft(data){
    let arr = data.slice();
    let k =0;
    while (k < this.size - 1) {
      for (let i = 0; i < this.size; i++) {
        for (let j = 1; j < this.size; j++) {
          if (arr[i][j] !== 0 && arr[i][j - 1] === 0) {
            arr[i][j - 1] = arr[i][j];
            arr[i][j] = 0;
          } else if (arr[i][j] === arr[i][j - 1]) {
            arr[i][j - 1] = arr[i][j] + arr[i][j - 1];
            arr[i][j] = 0;
          }
        }
      }
      k++;
    }
    this.makeRandomCell(arr);
    return arr;
  }
  moveRight(data){
    let arr = data.slice();
    let k =0;
    while (k < this.size - 1) {
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size - 1; j++) {
          if (arr[i][j] !== 0 && arr[i][j + 1] === 0) {
            arr[i][j + 1] = arr[i][j];
            arr[i][j] = 0;
          } else if (arr[i][j] === arr[i][j + 1]) {
            arr[i][j + 1] = arr[i][j] + arr[i][j + 1];
            arr[i][j] = 0;
          }
        }
      }
      k++;
    }

    this.makeRandomCell(arr);
    return arr;


  }


  render() {
   let  {cells} = this.state;

    // console.log(cells1);
    return (
      <div className="App">
        <Field cells={cells}/>
      </div>
    );
  }
}

export default App;
