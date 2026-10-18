import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { APP_ROUTES } from '../../core/constants/routes.constants';
import { GAME_DIFFICULTY, LANGUAGES, SETTINGS_OPTIONS } from '../../core/constants/settings.constants';
import { RadioOption } from '../../core/models/settings.model';
import { ModalService } from '../../core/services/modal.service';
import { SettingsService } from '../../core/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrl: 'settings.component.scss',
  imports: [TranslatePipe],
})
export class SettingsComponent {
  private readonly settingsService = inject(SettingsService);
  private readonly translateService = inject(TranslateService);
  private readonly router = inject(Router);
  private readonly modalService = inject(ModalService);

  protected helpModalOpen = false;
  protected helpText = signal<string>('');
  protected settingsOptions = SETTINGS_OPTIONS;

  protected languageOptions = signal<RadioOption<LANGUAGES>[]>([
    {
      value: LANGUAGES.CATALAN,
      label: 'CONFIGURATION.LANGUAGE.OPTIONS.CATALAN',
      checked: this.settingsService.language === LANGUAGES.CATALAN
    },
    {
      value: LANGUAGES.SPANISH,
      label: 'CONFIGURATION.LANGUAGE.OPTIONS.SPANISH',
      checked: this.settingsService.language === LANGUAGES.SPANISH
    },
  ]);

  protected gameDifficultyOptions = signal<RadioOption<GAME_DIFFICULTY>[]>([
    {
      value: GAME_DIFFICULTY.EASY,
      label: 'CONFIGURATION.GAME_DIFFICULTY.OPTIONS.EASY',
      checked: this.settingsService.gameDifficulty === GAME_DIFFICULTY.EASY
    },
    {
      value: GAME_DIFFICULTY.MEDIUM,
      label: 'CONFIGURATION.GAME_DIFFICULTY.OPTIONS.MEDIUM',
      checked: this.settingsService.gameDifficulty === GAME_DIFFICULTY.MEDIUM
    },
    {
      value: GAME_DIFFICULTY.HARD,
      label: 'CONFIGURATION.GAME_DIFFICULTY.OPTIONS.HARD',
      checked: this.settingsService.gameDifficulty === GAME_DIFFICULTY.HARD
    },
  ]);

  protected goHome() {
    this.router.navigate([APP_ROUTES.HOME]);
  }

  protected languageChange(value: string): void {
    if (value) {
      this.settingsService.language = (value as LANGUAGES);
      this.translateService.use(value as LANGUAGES);
    }
  }

  protected gameDifficultyChange(value: number): void {
    if (value !== undefined) {
      this.settingsService.gameDifficulty = (value as GAME_DIFFICULTY);
    }
  }

  protected openHelp(option: SETTINGS_OPTIONS): void {
    this.modalService.open<ConfirmModalComponent, undefined>(ConfirmModalComponent, {
      "showLeftButton": false,
      "showRightButton": true,
      "rightButtonStr": "BUTTONS.ACCEPT",
      "content": `CONFIGURATION.${option}.HELP`
    });
  }
}
