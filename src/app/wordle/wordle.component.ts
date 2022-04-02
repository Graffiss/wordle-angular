import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AddGuessService } from '../add-guess.service';
import { NUMBER_OF_GUESSES } from '../constants';
import { GuessRow, GuessService } from '../guess.service';

@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.css'],
})
export class WordleComponent implements OnInit, OnChanges {
  // words = words;
  public words: GuessRow[] = [];

  isGameOver = this.guessService.gameState !== 'playing';

  constructor(
    public guessService: GuessService,
    public addGuessService: AddGuessService
  ) {}

  keyProps = (key: string) => {
    console.log('Clicked key:', key);
    return this.addGuessService.addGuessLetter(key.replace(/\s/g, ''));
  };

  ngOnInit(): void {
    let rows = [...this.guessService.rows];
    console.log('Guess:', this.addGuessService.guess);

    let currentRow = 0;
    if (rows.length < NUMBER_OF_GUESSES) {
      currentRow =
        rows.push({ guess: this.addGuessService.guess, result: [] }) - 1;
      console.log('Current row:', currentRow);
    }
    const guessesRemaining = NUMBER_OF_GUESSES - rows.length;
    rows = rows.concat(
      Array(guessesRemaining).fill({
        guess: '',
        result: [],
      })
    );
    console.log('Rows:', rows);

    this.words = rows;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes?.['words']?.currentValue &&
      changes?.['words'].currentValue !== changes?.['words'].previousValue
    ) {
      let rows = [...this.guessService.rows];
      console.log('Rows:', rows);
      console.log('Guess:', this.addGuessService.guess);

      let currentRow = 0;
      if (rows.length < NUMBER_OF_GUESSES) {
        currentRow =
          rows.push({ guess: this.addGuessService.guess, result: [] }) - 1;
        console.log('Current row:', currentRow);
      }
      const guessesRemaining = NUMBER_OF_GUESSES - rows.length;
      rows = rows.concat(
        Array(guessesRemaining).fill({
          guess: '',
          result: [],
        })
      );
      this.words = rows;
    }
  }
}
