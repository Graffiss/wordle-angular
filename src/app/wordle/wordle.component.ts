import { Component, HostListener, Input, OnInit } from '@angular/core';
import { pairwise, startWith } from 'rxjs';
import { isValidWord } from 'src/utils/get-words';
import { AddGuessService } from '../add-guess.service';
import { WORD_LENGTH } from '../constants';
import { GuessRow } from '../add-guess.service';

@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.css'],
})
export class WordleComponent implements OnInit {
  @HostListener('window:keydown', ['$event']) spaceEvent(event: KeyboardEvent) {
    this.addGuessLetter(event.key);
  }
  public rows: GuessRow[] = [];
  public previous: string = '';

  @Input() get guess(): string {
    return this.addGuessService.guess;
  }

  set guess(value) {
    this.addGuessService.guess = value;
  }

  get words(): GuessRow[] {
    return this.addGuessService.words;
  }

  get isGameOver() {
    return this.addGuessService.gameState !== 'playing';
  }

  constructor(public addGuessService: AddGuessService) {}

  get currentGuess() {
    return this.addGuessService.guess;
  }

  get previousGuess() {
    return this.addGuessService.previousGuess$
      .pipe(startWith(this.guess), pairwise())
      .subscribe(([previous, current]) => {
        this.previous = previous;
        this.guess = current;
        if (this.guess.length === 0 && previous.length === WORD_LENGTH) {
          if (isValidWord(previous)) {
            this.addGuessService.addGuess(previous);
          } else {
            this.addGuessService.guess = previous;
          }
        }
      });
  }

  addGuessLetter(letter: string) {
    if (letter === 'Enter') {
      this.previousGuess;
    }
    this.addGuessService.addGuessLetter(letter);
    this.addGuessService.setWords();
  }

  ngOnInit(): void {
    this.addGuessService.setWords();
  }
}
