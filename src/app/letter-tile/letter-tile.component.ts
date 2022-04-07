import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LetterState } from '../add-guess.service';

const characterStateStyles = {
  [LetterState.Miss]: '#3a3a3c',
  [LetterState.Present]: '#b59f3b',
  [LetterState.Match]: '#538e4e',
};
@Component({
  selector: 'app-letter-tile',
  templateUrl: './letter-tile.component.html',
  styleUrls: ['./letter-tile.component.css'],
})
export class LetterTileComponent implements OnInit, OnChanges {
  @Input() value!: string;
  @Input() state: LetterState | null = null;

  stateStyles: string = '#121213';

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.stateStyles =
      this.state == null ? '#121213' : `${characterStateStyles[this.state]}`;
  }
}
