import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddGuessService } from '../add-guess.service';
import { KEYBOARD_LETTERS } from '../constants';
import { LetterState } from '../add-guess.service';

const keyStateStyles = {
  [LetterState.Miss]: '#3a3a3c',
  [LetterState.Present]: '#b59f3b',
  [LetterState.Match]: '#538e4e',
};

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css'],
})
export class KeyboardComponent implements OnInit {
  @Input() onClickProps!: (key: string) => void;
  @Output() keyPressed = new EventEmitter<string>();

  keyboardLetters: string[] = [];

  constructor(private addGuessService: AddGuessService) {
    this.keyboardLetters = KEYBOARD_LETTERS.map((key) => key);
  }

  keyStyle(key: string) {
    return keyStateStyles[this.addGuessService.keyboardLetterState[key]];
  }

  onClick(key: string): void {
    this.keyPressed.emit(key);
  }

  ngOnInit(): void {}
}
