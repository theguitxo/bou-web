import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Subscription, take, timer } from 'rxjs';
import { ConfirmModalComponent, ConfirmModalResult } from '../../../components/confirm-modal/confirm-modal.component';
import { ModalRef } from '../../../core/classes/modalref.class';
import { APP_ROUTES } from '../../../core/constants/routes.constants';
import { GAME_HELP_DURATION } from '../../../core/constants/settings.constants';
import { FIREWORKS_POINTS_POSITIONS } from '../../../core/models/fireworks.points.model';
import { GameService } from '../../../core/services/game.service';
import { ModalService } from '../../../core/services/modal.service';
import { FirePointTitleComponent } from '../components/fire-point-title/fire-point-title.component';
import { BackFirePointsComponent } from '../components/fire-points/back-fire-points/back-fire-points.component';
import { HeadFirePointsComponent } from '../components/fire-points/head-fire-points/head-fire-points.component';

@Component({
  selector: 'app-game-fire-point',
  templateUrl: './game-fire-point.component.html',
  styleUrl: './game-fire-point.component.scss',
  imports: [
    TranslatePipe,
    HeadFirePointsComponent,
    BackFirePointsComponent,
    FirePointTitleComponent
  ],
})
export class GameFirePointComponent implements OnInit, OnDestroy {
  private readonly gameService = inject(GameService);
  private readonly modalService = inject(ModalService);
  private readonly router = inject(Router);

  private instructionsModal!: ModalRef<ConfirmModalResult>;

  private showing = signal<FIREWORKS_POINTS_POSITIONS>(
    this.gameService.fireworkPlayedInfo?.fireworkPosition ?? 'HEAD'
  );

  protected showHeadValue = computed(() => this.showing() === 'HEAD');
  protected showBackValue = computed(() => this.showing() === 'BACK');
  protected firePoint = toSignal(this.gameService.currentGamePoint);

  protected gameHelps = toSignal(this.gameService.gameHelps);
  protected disableGameHelps = computed(() => (this.gameHelps() ?? 0) <= 0);

  protected showButtons = signal(true);

  protected gameHelpDurationStyle = signal<string>(`${GAME_HELP_DURATION}s`);

  private timerSubscription: Subscription | undefined;

  ngOnInit(): void {
    if (this.gameService.fireworkPlayedInfo) {
      this.gameService.fireworkPlayedInfo = undefined;
    }
  }

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
  }

  protected showHead(): void {
    this.showing.set('HEAD');
  }

  protected showBack(): void {
    this.showing.set('BACK');
  }

  protected checkGamedFirePoint(): void {
    if (![
      ...(this.firePoint()?.playFireworksPoints?.BANYES ?? [undefined]),
      ...(this.firePoint()?.playFireworksPoints?.MORRO ?? [undefined]),
      ...(this.firePoint()?.playFireworksPoints?.CUA ?? [undefined]),
    ]?.every((i) => !!i)) {

      this.instructionsModal =
        this.modalService.open<ConfirmModalComponent, ConfirmModalResult>(ConfirmModalComponent, {
          "showLeftButton": true,
          "showRightButton": true,
          "leftButtonStr": "BUTTONS.YES",
          "rightButtonStr": "BUTTONS.NO",
          "content": 'GAME.NOT_ALL_POINTS_GAMED'
        });

      this.instructionsModal.closed
        .pipe(take(1))
        .subscribe((data: ConfirmModalResult) => {
          if (data?.leftButton) {
            this.acceptGamedPoint();
          }
        });
    } else {
      this.acceptGamedPoint();
    }
  }

  private acceptGamedPoint(): void {
    this.gameService.checkPointScore();
    this.router.navigate([
      APP_ROUTES.GAME,
      APP_ROUTES.GAME_FIRE_VIDEO,
    ]);
  }

  protected showHelp(): void {
    this.showButtons.set(false);
    this.gameService.useGameHelps();
    this.gameService.showGameHelp();
    this.timerSubscription = timer(GAME_HELP_DURATION * 1000).subscribe(() => {
      this.showButtons.set(true);
      this.gameService.resetGameHelp();
    })
  }
}
