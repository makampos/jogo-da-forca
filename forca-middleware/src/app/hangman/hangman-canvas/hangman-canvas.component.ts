import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GameService } from 'src/app/game.service';


@Component({
  selector: 'app-hangman-canvas',
  templateUrl: './hangman-canvas.component.html',
  styleUrls: ['./hangman-canvas.component.scss'],
})
export class HangmanCanvasComponent implements OnInit, AfterViewInit {
  @ViewChild('hangman')
  hangmanCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const context: CanvasRenderingContext2D = this.hangmanCanvas.nativeElement.getContext(
      '2d'
    );    
  }
}
