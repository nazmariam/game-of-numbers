import React, { Component } from "react";

export default class Field extends Component {

  initNewField() {
    let {cells} = this.props;
    // let cells1 = this.makeRandomCell(cells);
    // let cells2 = this.makeRandomCell(cells1);
    let allCells = cells.map(item => {
      return item.map(i => {
        return <div className="cell">{i ? i : ""}</div>;
      });
    });

    return <div className="field">{allCells}</div>;
  }
  // makeRandomCell(arr) {
  //   let rt = this.availableCells();
  //   if (this.availableCells().length) {
  //     let randomNumber = Math.floor(Math.random() * rt.length);
  //     arr[rt[randomNumber].i][rt[randomNumber].j] = Math.random() < 0.9 ? 2 : 4;
  //   }
  //   return arr;
  // }
  // availableCells() {
  //   let avCells = [];
  //   let {cells} = this.props;
  //   if (cells.length) {
  //     for (let i = 0; i < this.size; i++) {
  //       for (let j = 0; j < this.size; j++) {
  //         if (cells[i][j] === 0) {
  //           avCells.push({ i, j });
  //         }
  //       }
  //     }
  //   }
  //   return avCells;
  // }
  // handleKeyDown(event) {
  //   const up = 38;
  //   const right = 39;
  //   const down = 40;
  //   const left = 37;
  //   let {cells} = this.props;
  //   const rt = cells.slice();
  //   if (event.keyCode === up) {
  //
  //     const oldState = cells.slice();
  //     let newState = this.moveUp(oldState);
  //     console.log('newState ',newState);
  //     console.log('oldState ',rt);
  //   } else if (event.keyCode === right) {
  //     let newState = this.moveRight(cells);
  //   } else if (event.keyCode === down) {
  //     let newState = this.moveDown(cells);
  //   } else if (event.keyCode === left) {
  //     let newState = this.moveLeft(cells);
  //   }
  // }
  // compareStates(arr1,arr2){
  //
  // }
  // moveUp(data){
  //   let k = 0;
  //   let arr = data.slice();
  //   while(k<this.size-1){
  //     for(let j = 0; j<this.size; j++){
  //       for(let i=1; i<this.size; i++){
  //         let r=0;
  //         if(arr[i][j]!==0 && arr[i-1][j]===0){
  //           arr[i-1][j]=arr[i][j];
  //           arr[i][j]=0;
  //         }else if((arr[i][j] === arr[i-1][j]) && r<1){
  //           arr[i-1][j]=arr[i][j] + arr[i-1][j];
  //           arr[i][j]=0;
  //           r++;
  //         }
  //       }
  //     }
  //     k++;
  //   }
  //   this.makeRandomCell(arr);
  //   return arr;
  // }
  // moveDown(data){
  //   let arr = data.slice();
  //   let k =0;
  //   while (k < this.size - 1) {
  //     for (let i = this.size - 2; i >= 0; i--) {
  //       for (let j = 0; j < this.size; j++) {
  //         if (arr[i][j] !== 0 && arr[i + 1][j] === 0) {
  //           arr[i + 1][j] = arr[i][j];
  //           arr[i][j] = 0;
  //         } else if (arr[i][j] === arr[i + 1][j]) {
  //           arr[i + 1][j] = arr[i][j] + arr[i + 1][j];
  //           arr[i][j] = 0;
  //         }
  //       }
  //     }
  //     k++;
  //   }
  //     this.makeRandomCell(arr);
  //     return arr;
  // }
  // moveLeft(data){
  //   let arr = data.slice();
  //   let k =0;
  //     while (k < this.size - 1) {
  //       for (let i = 0; i < this.size; i++) {
  //         for (let j = 1; j < this.size; j++) {
  //           if (arr[i][j] !== 0 && arr[i][j - 1] === 0) {
  //             arr[i][j - 1] = arr[i][j];
  //             arr[i][j] = 0;
  //           } else if (arr[i][j] === arr[i][j - 1]) {
  //             arr[i][j - 1] = arr[i][j] + arr[i][j - 1];
  //             arr[i][j] = 0;
  //           }
  //         }
  //       }
  //       k++;
  //     }
  //     this.makeRandomCell(arr);
  //     return arr;
  // }
  // moveRight(data){
  //   let arr = data.slice();
  //   let k =0;
  //     while (k < this.size - 1) {
  //       for (let i = 0; i < this.size; i++) {
  //         for (let j = 0; j < this.size - 1; j++) {
  //           if (arr[i][j] !== 0 && arr[i][j + 1] === 0) {
  //             arr[i][j + 1] = arr[i][j];
  //             arr[i][j] = 0;
  //           } else if (arr[i][j] === arr[i][j + 1]) {
  //             arr[i][j + 1] = arr[i][j] + arr[i][j + 1];
  //             arr[i][j] = 0;
  //           }
  //         }
  //       }
  //       k++;
  //     }
  //
  //     this.makeRandomCell(arr);
  //     return arr;
  //
  //
  // }
  render() {
    return this.initNewField();
  }
}
