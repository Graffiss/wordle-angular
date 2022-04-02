import { Component, Input, OnInit } from '@angular/core';
import { LetterState } from '../guess.service';

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
export class LetterTileComponent implements OnInit {
  @Input() value!: string;
  @Input() state: LetterState | null = null;

  stateStyles =
    this.state == null ? '#121213' : `${characterStateStyles[this.state]}`;

  constructor() {}

  ngOnInit(): void {}
}
