import { OnInit } from '@angular/core';
import { Directive, HostBinding, Input } from '@angular/core';
import { GameService } from '../game.service';

@Directive({
  selector: '[appLives]',
})
export class LivesDirective {
  @Input()
  appLives: string;

  @HostBinding('class.btn-warning')
  get warningClass(): boolean {
    return (
      this.gameService.maxFails - this.gameService.fails.getValue() > 3 &&
      this.gameService.maxFails - this.gameService.fails.getValue() <= 6
    );
  }

  @HostBinding('class.btn-danger')
  get dangerClass(): boolean {
    return this.gameService.maxFails - this.gameService.fails.getValue() <= 3;
  }

  constructor(private gameService: GameService) {}
}
