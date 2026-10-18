import { DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AppProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { ImagePreloaderService } from './core/services/image.preloader.service';
import { SettingsService } from './core/services/settings.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DecimalPipe, TranslatePipe, AppProgressBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [ImagePreloaderService]
})
export class App {
  private readonly translateService = inject(TranslateService);
  private readonly settingsService = inject(SettingsService);
  private readonly preloader = inject(ImagePreloaderService);

  protected isLoading = signal<boolean>(true);
  protected loadProgress = signal<number>(0);

  private imagesToPreload: string[] = [
    'img/fire_points/avatars/cafes.png',
    'img/fire_points/avatars/lira.png',
    'img/fire_points/avatars/muralla.png',
    'img/fire_points/avatars/pl_nova.png',
    'img/fire_points/avatars/pl_vella.png',
    'img/fire_points/avatars/pont_fransa.png',
    'img/fire_points/avatars/quatre_fonts.png',
    'img/fire_points/avatars/rambla.png',
    'img/fire_points/avatars/rasa_sola.png',
    'img/fire_points/avatars/roquetes.png',
    'img/fire_points/backgrounds/cafes.png',
    'img/fire_points/backgrounds/lira.png',
    'img/fire_points/backgrounds/muralla.png',
    'img/fire_points/backgrounds/pl_nova.png',
    'img/fire_points/backgrounds/pl_vella.png',
    'img/fire_points/backgrounds/pont_fransa.png',
    'img/fire_points/backgrounds/quatre_fonts.png',
    'img/fire_points/backgrounds/rambla.png',
    'img/fire_points/backgrounds/rasa_sola.png',
    'img/fire_points/backgrounds/roquetes.png',
    'img/fire_points/headers/cafes.png',
    'img/fire_points/headers/lira.png',
    'img/fire_points/headers/muralla.png',
    'img/fire_points/headers/pl_nova.png',
    'img/fire_points/headers/pl_vella.png',
    'img/fire_points/headers/pont_fransa.png',
    'img/fire_points/headers/quatre_fonts.png',
    'img/fire_points/headers/rambla.png',
    'img/fire_points/headers/rasa_sola.png',
    'img/fire_points/headers/roquetes.png',
    'img/fireworks/places/banyes_1.png',
    'img/fireworks/places/banyes_2.png',
    'img/fireworks/places/cua_1.png',
    'img/fireworks/places/cua_2.png',
    'img/fireworks/places/cua_3.png',
    'img/fireworks/places/morro_1.png',
    'img/fireworks/places/morro_2.png',
    'img/fireworks/places/morro_3.png',
    'img/fireworks/places/morro_4.png',
    'img/fireworks/places/morro_5.png',
    'img/fireworks/places/morro_6.png',
    'img/fireworks/places/morro_7.png',
    'img/fireworks/types/carretilla.svg',
    'img/fireworks/types/cracker.svg',
    'img/fireworks/types/roncador.svg',
    'img/fireworks/types/sortidor.svg',
    'img/fireworks/types/supercarretilla.svg',
    'img/fireworks/types/volcanet.svg',
    'img/instructions/slide_1_image_1.svg',
    'img/instructions/slide_2_image_1.svg',
    'img/instructions/slide_3_image_1.svg',
    'img/instructions/slide_4_image_1.svg',
    'img/instructions/slide_4_image_2_ca.png',
    'img/instructions/slide_4_image_2_es.png',
    'img/instructions/slide_4_image_3_ca.png',
    'img/instructions/slide_4_image_3_es.png',
    'img/instructions/slide_4_image_4_ca.png',
    'img/instructions/slide_4_image_4_es.png',
    'img/instructions/slide_4_image_5_ca.png',
    'img/instructions/slide_4_image_5_es.png',
    'img/instructions/slide_4_image_6_ca.png',
    'img/instructions/slide_4_image_6_es.png',
    'img/instructions/slide_4_image_7_ca.png',
    'img/instructions/slide_4_image_7_es.png',
    'img/instructions/slide_5_image_1_ca.png',
    'img/instructions/slide_5_image_1_es.png',
    'img/instructions/slide_6_image_1.svg',
    'img/instructions/slide_6_image_2_ca.png',
    'img/instructions/slide_6_image_2_es.png',
    'img/instructions/slide_6_image_3_ca.png',
    'img/instructions/slide_6_image_3_es.png',
    'img/instructions/slide_7_image_1.svg',
    'img/instructions/slide_8_image_1.svg',
    'img/summary.svg',
    'img/logo_bou.svg'
  ]
  constructor() {
    this.settingsService.loadSettings();
    this.settingsService.loadAppValues();
    this.translateService.use(this.settingsService.language);

    // addIcons(APP_ICONS);
  }

  ngOnInit(): void {
    this.preloadImages();
  }

  private preloadImages(): void {
    this.preloader.getDownloadProgress().subscribe((progress) => {
      this.loadProgress.set(progress * 100);
    });

    this.preloader.preloadImages(this.imagesToPreload).then(() => {
      this.isLoading.set(false);
    });
  }
}
