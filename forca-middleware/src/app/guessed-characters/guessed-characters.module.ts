import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuessedCharactersComponent } from './guessed-characters.component';
import { GuessedCharDirective } from './guessed-char.directive';

@NgModule({
  declarations: [GuessedCharactersComponent, GuessedCharDirective],
  exports: [GuessedCharactersComponent],
  imports: [CommonModule],
})
export class GuessedCharactersModule {}
