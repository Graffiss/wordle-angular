import { Injectable } from '@angular/core';
import { BehaviorSubject, pairwise, startWith, Subject } from 'rxjs';
import { calculateGuess } from 'src/utils/calculate-guess';
import { getWord } from 'src/utils/get-words';
import { NUMBER_OF_GUESSES, WORD_LENGTH } from './constants';

export enum LetterState {
  Miss, // No letter in this word
  Present, // Letter at wrong location
  Match, // Letter at right location
}

export interface GuessRow {
  guess: string;
  result: LetterState[] | [];
}
@Injectable({
  providedIn: 'root',
})
export class AddGuessService {
  public guess: string = '';
  public words: GuessRow[] = [];
  public rows: GuessRow[] = [];
  public keyboardLetterState: { [letter: string]: LetterState } = {};
  public answer: string = getWord();
  public gameState: 'playing' | 'won' | 'lost' = 'playing';

  guessChange: Subject<string> = new Subject<string>();
  wordsChange: Subject<GuessRow[]> = new Subject<GuessRow[]>();
  rowsChange: Subject<GuessRow[]> = new Subject<GuessRow[]>();
  previousGuessSource: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  public previousGuess: string = '';

  previousGuess$ = this.previousGuessSource.asObservable();

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
    this.previousGuessSource.subscribe((value) => {
      this.previousGuess = value;
    });
  }

  setPreviousGuess() {
    return this.previousGuess$
      .pipe(startWith(this.guess), pairwise())
      .subscribe(([previous, current]) => {
        return (this.previousGuess = previous);
      });
  }

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
    console.log('Answer:', this.answer);

    this.rowsChange.next(rows);
    this.keyboardLetterState = keyboardLetterState;
    this.gameState = didWin
      ? 'won'
      : this.rows.length === NUMBER_OF_GUESSES
      ? 'lost'
      : 'playing';
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

  newGame(initialRows = []) {
    this.gameState = 'playing';
    this.answer = getWord();
    this.rows = [];
    this.keyboardLetterState = {};
    initialRows.forEach(this.addGuess);
    this.setWords();
  }
}
