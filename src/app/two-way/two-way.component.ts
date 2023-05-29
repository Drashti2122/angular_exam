import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-two-way',
  templateUrl: './two-way.component.html',
  styleUrls: ['./two-way.component.css']
})
export class TwoWayComponent {
  newName: any;

  dataForm = new FormGroup({
    test1: new FormControl('', Validators.required)
  })

  get test1() {
    return this.dataForm.get('test1');
  }
  ngData() {
    console.log(this.dataForm.value);
    const postData = this.dataForm.value;
    let name = postData.test1;

    const formattedInput = name!.replace(/\s/g, '_').toLowerCase();

    // Generate a random number between 1 and 99
    const randomNumber = Math.floor(Math.random() * 99) + 1;

    // Create the final string with the formatted input and random number
    const result = `${formattedInput}_${randomNumber.toString().padStart(2, '0')}`;

    console.log(result);
  }

  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  currentPlayer: string = 'X';
  winner: string = '';

  makeMove(row: number, col: number) {
    if (!this.board[row][col] && !this.winner) {
      this.board[row][col] = this.currentPlayer;
      this.checkWinner();
      this.togglePlayer();
    }
  }

  togglePlayer() {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  checkWinner() {
    // Check rows
    for (let row = 0; row < 3; row++) {
      if (
        this.board[row][0] &&
        this.board[row][0] === this.board[row][1] &&
        this.board[row][0] === this.board[row][2]
      ) {
        this.winner = this.board[row][0];
        return;
      }
    }

    // Check columns
    for (let col = 0; col < 3; col++) {
      if (
        this.board[0][col] &&
        this.board[0][col] === this.board[1][col] &&
        this.board[0][col] === this.board[2][col]
      ) {
        this.winner = this.board[0][col];
        return;
      }
    }

    // Check diagonals
    if (
      this.board[0][0] &&
      this.board[0][0] === this.board[1][1] &&
      this.board[0][0] === this.board[2][2]
    ) {
      this.winner = this.board[0][0];
      return;
    }

    if (
      this.board[0][2] &&
      this.board[0][2] === this.board[1][1] &&
      this.board[0][2] === this.board[2][0]
    ) {
      this.winner = this.board[0][2];
      return;
    }
  }

  isBoardFull() {
    for (let row of this.board) {
      if (row.includes('')) {
        return false;
      }
    }
    return true;
  }

  resetGame() {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.currentPlayer = 'X';
    this.winner = '';
  }
}
