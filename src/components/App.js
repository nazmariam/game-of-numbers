import React, { Component } from "react";
import { addToStorage, rotate45, match } from "../utils/helpers.js";
import Field from "./field.js";

class App extends Component {
  state = {
    cells: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    latestCoordinates: {},
    gameOver: false,
    score: 0
  };
  size = 4;

  componentDidMount() {
    let { cells } = this.state;
    let cells1 = this.makeRandomCell(cells);
    this.setState(this.makeRandomCell(cells1));
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }
  setBestScore() {
    let finishScore = this.state.score;
    let bestFromStorage = JSON.parse(localStorage.getItem("score"));
    if (finishScore > bestFromStorage) {
      addToStorage(finishScore, "score");
    }
  }
  ifGamesOver(arr) {
    if (this.isGameOver(arr)) {
      this.setBestScore();
      this.setState({ gameOver: true });
    }
  }
  makeRandomCell(data) {
    let arr = data.slice();
    let rt = this.availableCells(arr);
    if (this.availableCells(arr).length) {
      let randomNumber = Math.floor(Math.random() * rt.length);
      arr[rt[randomNumber].i][rt[randomNumber].j] = Math.random() < 0.9 ? 2 : 4;
      this.setState({
        latestCoordinates: { i: rt[randomNumber].i, j: rt[randomNumber].j }
      });
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
  areMatches(arr) {
    let cells = arr.slice();
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        return (
          match(cells, i - 1, j, i, j) ||
          match(cells, i, j - 1, i, j) ||
          match(cells, i, j + 1, i, j) ||
          match(cells, i + 1, j, i, j)
        );
      }
    }
  }
  isGameOver(arr) {
    return (
      !this.areMatches(this.state.cells) && !this.availableCells(arr).length
    );
  }
  handleKeyDown(event) {
    const up = 38;
    const right = 39;
    const down = 40;
    const left = 37;
    let { cells } = this.state;
    if (event.keyCode === up) {
      let newState = this.moveUp(cells);
      this.setState(newState);
    } else if (event.keyCode === right) {
      let newState = this.moveRight(cells);
      this.setState({ cells: newState });
    } else if (event.keyCode === down) {
      let newState = this.moveDown(cells);
      this.setState({ cells: newState });
    } else if (event.keyCode === left) {
      let newState = this.moveLeft(cells);
      this.setState({ cells: newState });
    }
  }
  checkStep = (arr, i, j, moved) => {
    if (arr[i][j] !== 0 && arr[i - 1][j] === 0) {
      arr[i - 1][j] = arr[i][j];
      arr[i][j] = 0;
      moved = true;
      if (i >= 2) {
        this.checkStep(arr, i - 1, j, moved);
        moved = true;
        if (i === 3) {
          this.checkStep(arr, i - 2, j, moved);
          moved = true;
        }
      }
    } else if (arr[i][j] === arr[i - 1][j]) {
      arr[i - 1][j] = arr[i][j] + arr[i - 1][j];
      let score = this.state.score + arr[i][j];
      this.setState({ score });
      arr[i][j] = 0;
      moved = true;
    }

    return { arr, moved };
  };
  moveUp(data) {
    let arr = data.slice();
    let result,
      moved = false;
    for (let j = 0; j < this.size; j++) {
      for (let i = 1; i < this.size; i++) {
        result = this.checkStep(arr, i, j, moved);
      }
    }
    arr = result.arr;
    moved = result.moved;
    this.ifGamesOver(arr);
    return moved ? this.makeRandomCell(arr) : arr;
  }
  moveDown(data) {
    let arr = data.slice();
    let arr2 = rotate45(rotate45(arr));
    let moved = false;
    let result;
    for (let j = 0; j < this.size; j++) {
      for (let i = 1; i < this.size; i++) {
        result = this.checkStep(arr2, i, j, moved);
      }
    }
    arr = rotate45(rotate45(result.arr));
    moved = result.moved;
    this.ifGamesOver(arr);
    return moved ? this.makeRandomCell(arr) : arr;
  }
  moveLeft(data) {
    let arr = data.slice();

    let rotated = rotate45(arr);
    let moved = false;
    let result;
    for (let j = 0; j < this.size; j++) {
      for (let i = 1; i < this.size; i++) {
        result = this.checkStep(rotated, i, j, moved);
      }
    }
    arr = rotate45(rotate45(rotate45(result.arr)));
    moved = result.moved;
    this.ifGamesOver(arr);
    return moved ? this.makeRandomCell(arr) : arr;
  }
  moveRight(data) {
    let arr = data.slice();
    let rotated = rotate45(rotate45(rotate45(arr)));
    let moved = false;
    let result;
    for (let j = 0; j < this.size; j++) {
      for (let i = 1; i < this.size; i++) {
        result = this.checkStep(rotated, i, j, moved);
      }
    }
    arr = rotate45(result.arr);
    moved = result.moved;
    this.ifGamesOver(arr);
    return moved ? this.makeRandomCell(arr) : arr;
  }

  restart = () => {
    let cells = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    let allCells = this.makeRandomCell(this.makeRandomCell(cells));

    this.setState({
      cells: allCells,
      latestCoordinates: {},
      gameOver: false,
      score: 0
    });
  };

  render() {
    return (
      <div className="App">
        <Field props={this.state} />
        <div className="button-wrapper">
          <button onClick={this.restart}>New Game</button>
        </div>
      </div>
    );
  }
}

export default App;
