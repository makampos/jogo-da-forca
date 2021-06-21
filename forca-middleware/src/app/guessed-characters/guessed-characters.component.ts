import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-guessed-characters',
  templateUrl: './guessed-characters.component.html',
})
export class GuessedCharactersComponent implements OnInit {
  constructor(public gameService: GameService) {}

  ngOnInit(): void {}
}
