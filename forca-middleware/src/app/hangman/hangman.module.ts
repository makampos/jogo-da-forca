import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HangmanComponent } from './hangman.component';
import { HangmanCanvasComponent } from './hangman-canvas/hangman-canvas.component';
import { LivesDirective } from './lives.directive';

@NgModule({
  declarations: [HangmanComponent, HangmanCanvasComponent, LivesDirective],
  exports: [HangmanComponent],
  imports: [CommonModule],
})
export class HangmanModule {}
