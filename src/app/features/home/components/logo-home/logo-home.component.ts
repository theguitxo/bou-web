import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LangChangeEvent, Language, TranslateService } from '@ngx-translate/core';
import { LANGUAGES } from '../../../../core/constants/settings.constants';

@Component({
  selector: 'app-logo-home',
  templateUrl: './logo-home.component.html',
  styleUrl: './logo-home.component.scss',
})
export class LogoHomeComponent implements OnInit {
  private readonly translateService = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);

  protected lang = signal<Language | string | null>(null);

  protected isCatalan = computed(() => this.lang() === LANGUAGES.CATALAN);
  protected isSpanish = computed(() => this.lang() === LANGUAGES.SPANISH);

  ngOnInit(): void {
    this.lang.set(this.translateService.getCurrentLang());
    this.translateService.onLangChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value: LangChangeEvent) => {
        this.lang.set(value.lang);
      });
  }
}
