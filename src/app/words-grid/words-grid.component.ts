import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { WORD_LENGTH } from '../constants';
import { LetterState } from '../guess.service';

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

  ngOnChanges(changes: SimpleChanges) {
    const wordCurrentValue = changes?.['word']?.currentValue;
    console.log('Word current value:', wordCurrentValue);
    const lettersRemaining = WORD_LENGTH - this.word.length;

    this.letters = this.word.split('').concat(Array(lettersRemaining).fill(''));

    console.log('Changes in Words Grid:', changes);
  }
}
