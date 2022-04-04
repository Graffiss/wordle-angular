import { Component, HostListener, OnInit } from '@angular/core';
import { AddGuessService } from '../add-guess.service';
import { GuessRow, GuessService } from '../guess.service';

@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.css'],
})
export class WordleComponent implements OnInit {
  @HostListener('window:keydown', ['$event']) spaceEvent(event: KeyboardEvent) {
    this.addGuessLetter(event.key);
  }
  // public guess: string = '';
  public rows: GuessRow[] = [];

  get guess(): string {
    return this.addGuessService.guess;
  }

  get words(): GuessRow[] {
    return this.addGuessService.words;
  }

  isGameOver = this.guessService.gameState !== 'playing';

  constructor(
    public guessService: GuessService,
    public addGuessService: AddGuessService
  ) {}

  get currentGuess() {
    console.log('Current guess:', this.addGuessService.guess);
    return this.addGuessService.guess;
  }

  addGuessLetter(letter: string) {
    console.log('Words from service:', this.addGuessService.words);
    this.addGuessService.addGuessLetter(letter);
    this.addGuessService.setWords();
  }

  ngOnInit(): void {
    this.addGuessService.setWords();
  }
}
