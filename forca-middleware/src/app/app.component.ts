import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.initializeNewGame();           
  }  

    addItem($event){
      console.log($event);
    }
 
}
