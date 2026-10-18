import { NgClass } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { GameScoresSummary } from '../../../core/models/game.summary.model';
import { GameService } from '../../../core/services/game.service';

@Component({
  selector: 'app-game-summary',
  templateUrl: './game-summary.component.html',
  styleUrl: './game-summary.component.scss',
  imports: [TranslatePipe, NgClass],
})
export class GameSummaryComponent {
  private readonly gameService = inject(GameService);
  protected showCaptureButton = signal(true);
  protected summaryScores = toSignal(this.gameService.summaryScores);
  protected totalScore = computed<number>(() => this.summaryScores()?.reduce((previous: number, current: GameScoresSummary) => previous + (current?.score ?? 0), 0) ?? 0);
}
