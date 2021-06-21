import { Directive, HostBinding, Input } from '@angular/core';
import { GameService } from '../game.service';
import { Character } from '../models/character';

@Directive({
  selector: '[appKeyCharacter]',
})
export class KeyCharacterDirective {
  @Input()
  appKeyCharacter: string;

  @HostBinding('class.btn-success')
  get validClass(): boolean {
    return this.gameService.enteredCharacters
      .filter((ch: Character) => ch.char === this.appKeyCharacter)
      .some((ch: Character) => ch.guessed);
  }

  @HostBinding('class.disabled')
  get invalidClass(): boolean {
    return (
      !this.gameService.isStateDuring() ||
      this.gameService.enteredCharacters
        .filter((ch: Character) => ch.char === this.appKeyCharacter)
        .some((ch: Character) => !ch.guessed)
    );
  }

  constructor(private gameService: GameService) {}
}
