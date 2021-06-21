import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualKeyboardComponent } from './virtual-keyboard.component';
import { KeyCharacterDirective } from './key-character.directive';

@NgModule({
  declarations: [VirtualKeyboardComponent, KeyCharacterDirective],
  exports: [VirtualKeyboardComponent],
  imports: [CommonModule],
})
export class VirtualKeyboardModule {}
