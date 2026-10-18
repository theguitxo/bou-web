import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
  OnInit,
  signal,
  viewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { EmblaCarouselType, EmblaEventType, EmblaOptionsType } from 'embla-carousel';
import { EmblaCarouselDirective } from 'embla-carousel-angular';
import { APP_ROUTES } from '../../../core/constants/routes.constants';
import { GameFirePoints } from '../../../core/models/fire.points.model';
import { FIREWORKS_POINTS_POSITIONS, FIREWORKS_TYPES } from '../../../core/models/fireworks.points.model';
import { GameService } from '../../../core/services/game.service';
import { ModalService } from '../../../core/services/modal.service';
import { GeneralUtils } from '../../../utils/general.utils';
import { FirePointTitleComponent } from '../components/fire-point-title/fire-point-title.component';
import { BackFirePointsComponent } from '../components/fire-points/back-fire-points/back-fire-points.component';
import { HeadFirePointsComponent } from '../components/fire-points/head-fire-points/head-fire-points.component';
import { FireworkInfoComponent } from '../components/firework-info/firework-info.component';
import { NextPreviousLabels } from './fire-combinations.model';

@Component({
  selector: 'app-fire-combinations',
  templateUrl: './fire-combinations.component.html',
  styleUrl: './fire-combinations.component.scss',
  imports: [
    TranslatePipe,
    EmblaCarouselDirective,
    HeadFirePointsComponent,
    BackFirePointsComponent,
    FirePointTitleComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FireCombinationsPage implements OnInit {
  readonly emblaRef = viewChild(EmblaCarouselDirective);

  private readonly gameService = inject(GameService);
  private readonly modalService = inject(ModalService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  protected gameFirePoints = signal<GameFirePoints[] | undefined>([]);
  private showing = signal<FIREWORKS_POINTS_POSITIONS>('HEAD');
  protected showHeadValue = computed(() => this.showing() === 'HEAD');
  protected showBackValue = computed(() => this.showing() === 'BACK');

  protected options: EmblaOptionsType = {
    loop: false,
    watchDrag: false
  };
  public readonly subscribeToEvents: EmblaEventType[] = ['select', 'init'];
  private emblaApiRef = computed<EmblaCarouselType | null | undefined>(() => this.emblaRef()?.emblaApi);

  protected nextPreviousButtonLabel = signal<Map<number, NextPreviousLabels>>(
    new Map(),
  );

  ngOnInit(): void {
    this.gameService.gameFirePoints
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: GameFirePoints[] | undefined) =>
        this.setGamePointsInfo(data),
      );
  }

  private setGamePointsInfo(data: GameFirePoints[] | undefined): void {
    this.gameFirePoints.set(data);

    const labels = new Map<number, NextPreviousLabels>();

    const translateKeys = (this.gameFirePoints() ?? []).map(
      (item: GameFirePoints) => item.translateKey ?? '',
    );

    translateKeys.forEach((txt: string, index: number) => {
      labels.set(index, {
        next: GeneralUtils.IndexInArray(translateKeys, index + 1)
          ? translateKeys[index + 1]
          : '',
        previous: GeneralUtils.IndexInArray(translateKeys, index - 1)
          ? translateKeys[index - 1]
          : '',
      });
    });

    this.nextPreviousButtonLabel.set(labels);
  }

  protected showFirePointsList(): void {
    this.router.navigate([
      APP_ROUTES.GAME,
      APP_ROUTES.FIRE_POINTS_LIST,
    ]);
  }

  protected nextFirePoint(): void {
    this.emblaApiRef()?.scrollNext();
    this.showHead();
  }

  protected previousFirePoint(): void {
    this.emblaApiRef()?.scrollPrev();
    this.showHead();
  }

  protected showHead(): void {
    this.showing.set('HEAD');
  }

  protected showBack(): void {
    this.showing.set('BACK');
  }

  protected showFireWork(firework: FIREWORKS_TYPES): void {
    this.modalService.open<FireworkInfoComponent, void>(FireworkInfoComponent, {
      "firework": firework
    });
  }
}
