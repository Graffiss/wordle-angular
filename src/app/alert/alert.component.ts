import { Component, OnInit } from '@angular/core';
import { GuessService } from '../guess.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  gameWon = this.guessService.gameState === 'won';
  answer = this.guessService.answer;
  constructor(public guessService: GuessService) {}

  newGame() {
    this.guessService.newGame([]);
  }

  ngOnInit(): void {}
}
