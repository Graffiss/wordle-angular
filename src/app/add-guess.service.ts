import { Injectable } from '@angular/core';
import { WORD_LENGTH } from './constants';

@Injectable({
  providedIn: 'root',
})
export class AddGuessService {
  public guess: string = '';

  addGuessLetter(letter: string) {
    const newGuess =
      letter.length === 1 && this.guess.length !== WORD_LENGTH
        ? this.guess + letter
        : this.guess;

    switch (letter) {
      case 'Delete':
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

    console.log('Guess:', this.guess);
    console.log('New guess:', newGuess);

    return (this.guess = newGuess);
  }

  onKeyDown(e: KeyboardEvent) {
    const letter = e.key;
    this.addGuessLetter(letter);
  }
  constructor() {}
}
