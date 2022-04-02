import {
  Component,
  OnInit,
  Input,
  SimpleChange,
  Output,
  EventEmitter,
} from '@angular/core';
import { KEYBOARD_LETTERS } from '../constants';
import { LetterState, GuessService } from '../guess.service';

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

  keyboardLetters = KEYBOARD_LETTERS;

  constructor(private guessService: GuessService) {}

  keyStyle(key: string) {
    return keyStateStyles[this.guessService.keyboardLetterState[key]];
  }

  onClick(event: Event) {
    const { textContent, innerHTML } = event.currentTarget as HTMLButtonElement;

    let returnProps = textContent!;
    if (textContent !== innerHTML) {
      returnProps = 'Backspace';
    }
    this.onClickProps(returnProps);
    this.keyPressed.emit(returnProps);
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChange): void {
    console.log('CHANGES on keyboard:', changes);
  }
}
