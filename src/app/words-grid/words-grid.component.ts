import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { WORD_LENGTH } from '../constants';
import { LetterState } from '../add-guess.service';

@Component({
  selector: 'app-words-grid',
  templateUrl: './words-grid.component.html',
  styleUrls: ['./words-grid.component.css'],
})
export class WordsGridComponent implements OnInit, OnChanges {
  @Input() word!: string;
  @Input() result?: LetterState[] | [];

  letters: string[] | undefined;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    const lettersRemaining = WORD_LENGTH - this.word.length;

    this.letters = this.word.split('').concat(Array(lettersRemaining).fill(''));
  }
}
