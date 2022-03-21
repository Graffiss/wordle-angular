import { Injectable } from '@angular/core';
import { WORD_LENGTH } from './constants';

@Injectable({
  providedIn: 'root',
})
export class AddGuessService {
  guess = '';

  addGuessLetter(letter: string) {
    const newGuess =
      letter.length === 1 && this.guess.length !== WORD_LENGTH
        ? this.guess + letter
        : this.guess;
    console.log('guess:', this.guess);

    switch (letter) {
      case 'Backspace':
        return (this.guess = newGuess.slice(0, -1));
      case 'Enter':
        if (newGuess.length === WORD_LENGTH) {
          return (this.guess = '');
        }
    }

    if (newGuess.length === WORD_LENGTH) {
      this.guess = newGuess;
      return this.guess;
    }

    return (this.guess = newGuess);
  }

  onKeyDown(e: KeyboardEvent) {
    const letter = e.key;
    this.addGuessLetter(letter);
  }
  constructor() {}
}