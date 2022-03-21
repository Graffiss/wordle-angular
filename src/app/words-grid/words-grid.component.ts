import { Component, OnInit, Input } from '@angular/core';
import { WORD_LENGTH } from '../constants';

@Component({
  selector: 'app-words-grid',
  templateUrl: './words-grid.component.html',
  styleUrls: ['./words-grid.component.css'],
})
export class WordsGridComponent implements OnInit {
  @Input() word!: string;

  letters: string[] | undefined;

  constructor() {}

  ngOnInit(): void {
    const lettersRemaining = WORD_LENGTH - this.word.length;

    this.letters = this.word.split('').concat(Array(lettersRemaining).fill(''));
  }
}