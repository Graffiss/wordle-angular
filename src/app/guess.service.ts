import { Injectable } from '@angular/core';
import { calculateGuess } from 'src/utils/calculate-guess';
import { getWord } from 'src/utils/get-words';
import { NUMBER_OF_GUESSES } from './constants';

export enum LetterState {
  Miss, // No letter in this word
  Present, // Letter at wrong location
  Match, // Letter at right location
}

export interface GuessRow {
  guess: string;
  result: LetterState[] | [];
}

interface GuessState {
  answer: string;
  rows: GuessRow[];
  gameState: 'playing' | 'won' | 'lost';
  keyboardLetterState: { [letter: string]: LetterState };
  addGuess?(guess: string): void;
  newGame?(initialGuess?: string[]): void;
}

@Injectable({
  providedIn: 'root',
})
export class GuessService {
  answer: string = getWord();
  rows: GuessRow[] = [];
  gameState: 'playing' | 'won' | 'lost' = 'playing';
  keyboardLetterState: { [letter: string]: LetterState } = {};

  addGuess(guess: string) {
    const result = calculateGuess(guess, this.answer);

    const rows = this.rows.concat({
      guess,
      result,
    });

    const didWin = result.every((r) => r === LetterState.Match);

    const keyboardLetterState = this.keyboardLetterState;
    result.forEach((r, index) => {
      const resultGuessLetter = guess[index];

      const currentLetterState = keyboardLetterState[resultGuessLetter];
      switch (currentLetterState) {
        case LetterState.Match:
          break;
        case LetterState.Present:
          if (r === LetterState.Miss) {
            break;
          }
          keyboardLetterState[resultGuessLetter] = r;
          break;
        default:
          keyboardLetterState[resultGuessLetter] = r;
          break;
      }
    });

    this.rows = rows;
    this.keyboardLetterState = keyboardLetterState;
    this.gameState = didWin
      ? 'won'
      : this.rows.length === NUMBER_OF_GUESSES
      ? 'lost'
      : 'playing';
  }

  newGame(initialRows = []) {
    this.gameState = 'playing';
    this.answer = getWord();
    this.rows = [];
    this.keyboardLetterState = {};
    initialRows.forEach(this.addGuess);
  }

  constructor() {}
}
