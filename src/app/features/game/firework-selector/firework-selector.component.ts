import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FIREWORKS_POINTS } from '../../../core/constants/fireworks.contants';
import { APP_ROUTES } from '../../../core/constants/routes.constants';
import { FIREWORKS_TYPES } from '../../../core/models/fireworks.points.model';
import { GameService } from '../../../core/services/game.service';
import { FireworkSelectButton } from './firework-selector.models';

@Component({
  selector: 'app-firework-selector',
  templateUrl: './firework-selector.component.html',
  styleUrl: './firework-selector.component.scss',
  imports: [TranslatePipe],
})
export class FireworkSelectorComponent {
  private readonly gameService = inject(GameService);
  private readonly router = inject(Router);

  protected selectFireworkButtons = signal<FireworkSelectButton[]>([
    {
      img: 'img/fireworks/types/carretilla.svg',
      label: 'FIREWORKS.CARRETILLA.NAME',
      type: 'CARRETILLA',
    },
    {
      img: 'img/fireworks/types/supercarretilla.svg',
      label: 'FIREWORKS.SUPER_CARRETILLA.NAME',
      type: 'SUPER_CARRETILLA',
    },
    {
      img: 'img/fireworks/types/sortidor.svg',
      label: 'FIREWORKS.SORTIDOR.NAME',
      type: 'SORTIDOR',
    },
    {
      img: 'img/fireworks/types/roncador.svg',
      label: 'FIREWORKS.RONCADOR.NAME',
      type: 'RONCADOR',
    },
    {
      img: 'img/fireworks/types/cracker.svg',
      label: 'FIREWORKS.CRACKER.NAME',
      type: 'CRACKER',
    },
    {
      img: 'img/fireworks/types/volcanet.svg',
      label: 'FIREWORKS.VOLCANET.NAME',
      type: 'VOLCANET',
    },
  ]);

  protected fireworkPosition = signal(
    new Map<FIREWORKS_POINTS, string>([
      [FIREWORKS_POINTS.BANYES_1, 'img/fireworks/places/banyes_1.png'],
      [FIREWORKS_POINTS.BANYES_2, 'img/fireworks/places/banyes_2.png'],
      [FIREWORKS_POINTS.CUA_1, 'img/fireworks/places/cua_1.png'],
      [FIREWORKS_POINTS.CUA_2, 'img/fireworks/places/cua_2.png'],
      [FIREWORKS_POINTS.CUA_3, 'img/fireworks/places/cua_3.png'],
      [FIREWORKS_POINTS.MORRO_1, 'img/fireworks/places/morro_1.png'],
      [FIREWORKS_POINTS.MORRO_2, 'img/fireworks/places/morro_2.png'],
      [FIREWORKS_POINTS.MORRO_3, 'img/fireworks/places/morro_3.png'],
      [FIREWORKS_POINTS.MORRO_4, 'img/fireworks/places/morro_4.png'],
      [FIREWORKS_POINTS.MORRO_5, 'img/fireworks/places/morro_5.png'],
      [FIREWORKS_POINTS.MORRO_6, 'img/fireworks/places/morro_6.png'],
      [FIREWORKS_POINTS.MORRO_7, 'img/fireworks/places/morro_7.png'],
    ])
  );
  protected firePoint = signal<FIREWORKS_POINTS>(this.gameService.fireworkPlayedInfo?.firePosition ?? 0);

  protected returnGameFirePoint(): void {
    this.router.navigate([
      APP_ROUTES.GAME,
      APP_ROUTES.GAME_FIRE_POINT,
    ]);
  }

  protected selectFirework(selected: FIREWORKS_TYPES): void {
    if (this.firePoint() !== undefined) {
      this.gameService.setGamePlayFirework(this.firePoint() as FIREWORKS_POINTS, selected);
    }
    this.returnGameFirePoint();
  }
}
