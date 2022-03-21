import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-letter-tile',
  templateUrl: './letter-tile.component.html',
  styleUrls: ['./letter-tile.component.css'],
})
export class LetterTileComponent implements OnInit {
  @Input() value!: string;

  constructor() {}

  ngOnInit(): void {}
}
