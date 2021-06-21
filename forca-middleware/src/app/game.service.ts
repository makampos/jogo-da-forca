import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import * as words from 'random-words';
import { BehaviorSubject, Observable } from 'rxjs';


import { map } from 'rxjs/operators';

import { Character } from './models/character';
import { StateGame } from './models/state.game';



@Injectable({
  providedIn: 'root',
})
export class GameService {
  wordToGuess: string;
  randomParameter: string = 'random';

  points: number = 0;
  total: number = 0;
  
  fails: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  maxFails = 10;
  stateGame: BehaviorSubject<StateGame> = new BehaviorSubject<StateGame>(
    StateGame.DURING
  );
  enteredCharacters: Character[] = [];
  openDictionary: string;
  dictionaryBaseUrl:string;
  apiKey: string;

@Output() sendTotalPoints: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {
    this.openDictionary = 'https://api.dicionario-aberto.net'    
    this.dictionaryBaseUrl = 'https://api.dictionaryapi.dev/api/v2/entries/pt-BR'
  }


  fetchWord(): Observable<any> {
      return this.http.get(`${this.openDictionary}/${this.randomParameter}`)
      .pipe(map(response => response));          
    }

  fetchWordDefinition(): Observable<any> {
    return this.http.get(`${this.dictionaryBaseUrl}/${this.wordToGuess}`)
    .pipe(map(response => response[0].meanings[0].definitions[0].definition));
  }

  

  getWord(){
    this.fetchWord().subscribe((response) => {      
      this.wordToGuess = response.word.toUpperCase();
      console.log(this.wordToGuess);
    }) 
  }

  public refresh(){
    window.location.reload();
  }


  public initializeNewGame(): void {    
    this.getWord();
    
    setTimeout(()=> {      
      this.stateGame.next(StateGame.DURING);
      this.fails.next(0);
      this.enteredCharacters = [];
      this.wordToGuess = this.wordToGuess.normalize('NFD').replace(/[\u0300-\u036f]/g, "");           
    },1000)
    this.fetchWordDefinition();  
  }

  public addCharacter(char: string): void {
    if (this.stateGame.getValue() === StateGame.DURING) {
      char = char.toUpperCase();
      if (this.enteredCharacters.every((ch: Character) => ch.char !== char)) {
        let startIndex = 0;
        const indicies: number[] = [];

        while (true) {
          const index = this.wordToGuess.indexOf(char, startIndex);
          if (index === -1) {            
            break;
          }
          startIndex = index + 1;
          indicies.push(index);
        }

        if (indicies.length > 0) {
          indicies.forEach((idx: number) =>
            this.createAndAddCharacter(char, idx)
          );                            
        } else {
          this.fails.next(this.fails.getValue() + 1);
          this.createAndAddCharacter(char);
        }
      }
      this.stateGame.next(this.setStateGame());
    }
  }

  addNewItem(value: number) {
    this.sendTotalPoints.emit(this.total);
  }

  private createAndAddCharacter(char: string, index?: number): void {
    this.enteredCharacters = [
      ...this.enteredCharacters,
      {
        index,
        char,
        guessed: index !== undefined,
      },
    ];
  }

  private setStateGame(): StateGame {
    if (this.fails.getValue() >= this.maxFails) {
      return StateGame.GAME_OVER;
    }
    if (this.checkWin()) {
      return StateGame.WIN;
    }

    return StateGame.DURING;
  }

  private checkWin(): boolean {
    return this.wordToGuess
      .split('')
      .every((k: string) =>
        this.enteredCharacters
          .map((enteretChar) => enteretChar.char)
          .includes(k)
      );
  }

  public isStateDuring(): boolean {
    return this.stateGame.getValue() === StateGame.DURING;
  }
}
