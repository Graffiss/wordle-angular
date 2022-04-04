import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NUMBER_OF_GUESSES, WORD_LENGTH } from './constants';
import { GuessRow } from './guess.service';

@Injectable({
  providedIn: 'root',
})
export class AddGuessService {
  public guess: string = '';
  public words: GuessRow[] = [];
  public rows: GuessRow[] = [];

  guessChange: Subject<string> = new Subject<string>();
  wordsChange: Subject<GuessRow[]> = new Subject<GuessRow[]>();
  rowsChange: Subject<GuessRow[]> = new Subject<GuessRow[]>();

  constructor() {
    this.guessChange.subscribe((value) => {
      this.guess = value;
    });
    this.wordsChange.subscribe((value) => {
      this.words = value;
    });
    this.rowsChange.subscribe((value) => {
      this.rows = value;
    });
  }

  setWords() {
    let rows = [...this.rows];
    let currentRow = 0;
    if (rows.length < NUMBER_OF_GUESSES) {
      currentRow = rows.push({ guess: this.guess, result: [] }) - 1;
    }
    const guessesRemaining = NUMBER_OF_GUESSES - rows.length;
    rows = rows.concat(Array(guessesRemaining).fill({ guess: '', result: [] }));
    return this.wordsChange.next(rows);
  }

  addGuessLetter(letter: string) {
    const newGuess =
      letter.length === 1 && this.guess.length !== WORD_LENGTH
        ? this.guess + letter
        : this.guess;

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

    return this.guessChange.next(newGuess);
  }

  onKeyDown(e: KeyboardEvent) {
    const letter = e.key;
    this.addGuessLetter(letter);
  }
}
