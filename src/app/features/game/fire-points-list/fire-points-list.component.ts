import { NgStyle } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { take, timer } from 'rxjs';
import { BANYES_TOTAL_POINTS, CUA_TOTAL_POINTS, MORRO_TOTAL_POINTS } from '../../../core/constants/fireworks.contants';
import { APP_ROUTES } from '../../../core/constants/routes.constants';
import { GameFirePoints } from '../../../core/models/fire.points.model';
import { GameService } from '../../../core/services/game.service';

@Component({
  selector: 'app-fire-points-list',
  templateUrl: './fire-points-list.component.html',
  styleUrl: './fire-points-list.component.scss',
  imports: [
    TranslatePipe,
    NgStyle,
  ],
})
export class FirePointsListComponent implements AfterViewInit {
  private readonly gameService = inject(GameService);
  private readonly router = inject(Router);

  private enabledGame = toSignal(this.gameService.enabledGamePoint);
  protected gameFirePoints = toSignal(this.gameService.gameFirePoints);
  protected checkingFirePoint = toSignal(this.gameService.chekingFirePoint);

  protected totalPoints = BANYES_TOTAL_POINTS + MORRO_TOTAL_POINTS + CUA_TOTAL_POINTS;

  private currentPlayPoint!: GameFirePoints;

  ngAfterViewInit(): void {
    timer(0).pipe(take(1)).subscribe(() => {
      const element = document.querySelector(`#${this.enabledGame()?.code}`);
      if (element && !this.enabledGame()?.first) {
        element.scrollIntoView();
      }
    });
  }

  protected playPoint(item: GameFirePoints): void {
    this.currentPlayPoint = item;
    this.gameService.setCurrentGamePoint(this.currentPlayPoint);
    this.router.navigate([
      APP_ROUTES.GAME,
      APP_ROUTES.GAME_FIRE_POINT,
    ]);
  }
}
