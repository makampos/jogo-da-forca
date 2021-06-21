import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { StateGame } from '../models/state.game';
import { filter } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TemplateRef } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styles: [
    `
      .lives-btn {
        margin: 1rem 0;
      }
      @media (min-width: 768px) {
        .lives-btn {
          margin: 0;
        }
      }
    `,
  ],
})
export class HangmanComponent implements OnInit {
  WordDefinition: string;
  StateGame: any = StateGame;
  @ViewChild('content')
  modalContent: TemplateRef<any>;


  constructor(
    public gameService: GameService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.gameService.stateGame
      .pipe(filter((state) => state !== StateGame.DURING))
      .subscribe(() => {
        this.modalService.open(this.modalContent);
      });

      setTimeout(() => {
        this.getWordDefinition();
      },1100)
  }

  getWordDefinition(){
    this.gameService.fetchWordDefinition().subscribe((response) => {
      console.log(response);
      this.WordDefinition = response;
      
    })
  }

  
  
}
