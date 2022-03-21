import { Component, OnInit } from '@angular/core';
import { AddGuessService } from '../add-guess.service';
import { NUMBER_OF_GUESSES } from '../constants';
import { GuessRow, GuessService } from '../guess.service';

@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.css'],
})
export class WordleComponent implements OnInit {
  // words = words;
  words: GuessRow[] = [];

  isGameOver = this.guessService.gameState !== 'playing';

  constructor(
    public guessService: GuessService,
    public addGuessService: AddGuessService
  ) {}

  getWords() {
    let rows = [...this.guessService.rows];
    let currentRow = 0;
    if (rows.length < NUMBER_OF_GUESSES) {
      currentRow =
        rows.push({ guess: this.addGuessService.guess, result: [] }) - 1;
    }
    const guessesRemaining = NUMBER_OF_GUESSES - rows.length;
    rows = rows.concat(Array(guessesRemaining).fill({ guess: '', result: [] }));
    return rows;
  }

  keyProps = (key: string) => this.addGuessService.addGuessLetter(key);

  ngOnInit(): void {
    this.words = this.getWords();
  }
}
