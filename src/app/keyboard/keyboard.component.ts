import { Component, OnInit } from '@angular/core';
import { KEYBOARD_LETTERS } from '../constants';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css'],
})
export class KeyboardComponent implements OnInit {
  keyboardLetters = KEYBOARD_LETTERS;

  constructor() {}

  ngOnInit(): void {}
}
