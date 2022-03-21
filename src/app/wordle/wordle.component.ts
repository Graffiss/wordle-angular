import { Component, OnInit } from '@angular/core';
import { words } from '../constants';

@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.css'],
})
export class WordleComponent implements OnInit {
  words = words;
  isGameOver = false;

  constructor() {}

  ngOnInit(): void {}
}
