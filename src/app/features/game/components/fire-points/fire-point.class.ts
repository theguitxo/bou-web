import {
  computed,
  DestroyRef,
  Directive,
  inject,
  input,
  output,
  Signal
} from '@angular/core';
import { Router } from '@angular/router';
import { FIREWORKS_POINTS } from '../../../../core/constants/fireworks.contants';
import { APP_ROUTES } from '../../../../core/constants/routes.constants';
import { FIREWORKS_MODE, FIREWORKS_POINTS_POSITIONS, FIREWORKS_TYPES, FireworksPoints } from '../../../../core/models/fireworks.points.model';
import { GameService } from '../../../../core/services/game.service';

@Directive()
export abstract class FirePointDirective {

  points = input<FireworksPoints | undefined>();
  mode = input<FIREWORKS_MODE | undefined>();

  public showFirework = output<FIREWORKS_TYPES>();

  protected gameService = inject(GameService);
  protected destroyRef = inject(DestroyRef);
  protected router = inject(Router);

  protected fireworksPointsPosition!: FIREWORKS_POINTS_POSITIONS;

  protected _fireworkTypes: FIREWORKS_TYPES[] = [
    'CARRETILLA',
    'CRACKER',
    'RONCADOR',
    'SUPER_CARRETILLA',
    'SORTIDOR',
    'VOLCANET',
  ];

  protected fireworkPoints = FIREWORKS_POINTS;

  protected fireworkPointsValues!: Signal<
    Map<FIREWORKS_POINTS, FIREWORKS_TYPES | undefined> | undefined
  >;

  protected isPlayMode = computed(() => this.mode() === 'PLAY');

  protected setFirePointValues(value: FIREWORKS_TYPES | undefined): {
    [key: string]: boolean;
  } {
    const values: { [key: string]: boolean } = {};
    this._fireworkTypes.forEach((k) => (values[k] = k === value));
    return values;
  }

  protected fireWorkClicked(
    event: MouseEvent | TouchEvent,
    firePosition: FIREWORKS_POINTS
  ): void {
    event.stopPropagation();
    if (this.mode() === 'PLAY') {
      this.gameService.fireworkPlayedInfo = {
        firePosition,
        fireworkPosition: this.fireworksPointsPosition,
      };

      this.router.navigate([
        APP_ROUTES.GAME,
        APP_ROUTES.FIREWORK_SELECTOR,
      ]);
    } else {
      const value = this.fireworkPointsValues()?.get(firePosition);
      if (value) {
        this.showFirework.emit(value);
      }
    }
  }
}
