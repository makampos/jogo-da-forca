import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { GameService } from '../game.service';
import { Character } from '../models/character';

@Directive({
  selector: '[appGuessedChar]',
})
export class GuessedCharDirective implements OnChanges {
  @Input()
  appGuessedChar: Character[];

  constructor(
    private templateRef: TemplateRef<QuessedCharContext>,
    private viewContainerView: ViewContainerRef,
    private gameService: GameService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.appGuessedChar) {
      this.viewContainerView.clear();
      const currentEnteredValues: Character[] =
        changes.appGuessedChar.currentValue;
      this.gameService.wordToGuess
        .split('')
        .forEach((char: string, index: number) => {
          const quessedCharacter: Character = currentEnteredValues.find(
            (ch: Character) => ch.index === index && ch.guessed
          );
          this.viewContainerView.createEmbeddedView(
            this.templateRef,
            new QuessedCharContext(quessedCharacter?.char)
          );
        });
    }
  }
}

class QuessedCharContext {
  constructor(public $implicit: string) {}
}
