import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
@Component({
  selector: 'app-virtual-keyboard',
  templateUrl: './virtual-keyboard.component.html',
  styles: [
    `
      .btn-keyboard {
        padding: 0.25rem 0.5rem;
        font-size: 1.1rem;
      }
      @media (min-width: 455px) and (max-width: 565px) {
        .btn-keyboard {
          padding: 0.3rem 0.7rem;
          font-size: 1.25rem;
        }
      }
      @media (min-width: 566px) {
        .btn-keyboard {
          padding: 0.5rem 1rem;
          font-size: 1.25rem;
        }
      }
    `,
  ],
})
export class VirtualKeyboardComponent implements OnInit {
  characters: string[] = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
  ];

  constructor(public gameService: GameService) {}

  ngOnInit(): void {}

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    if (this.characters.includes(event.key.toUpperCase())) {
      this.gameService.addCharacter(event.key);
    }
  }

  keyClick(key: string): void {
    this.gameService.addCharacter(key);
  }
}
