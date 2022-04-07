import { Component, OnInit } from '@angular/core';
import { AddGuessService } from '../add-guess.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  gameWon = this.addGuessService.gameState === 'won';
  answer = this.addGuessService.answer;
  constructor(public addGuessService: AddGuessService) {}

  newGame() {
    this.addGuessService.newGame([]);
  }

  ngOnInit(): void {}
}
