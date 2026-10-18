import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  AppValues_LOCALSTORAGE_KEY,
  DEFAULT_GAME_DIFFICULTY,
  DEFAULT_LANGUAGE,
  GAME_DIFFICULTY,
  LANGUAGES,
  Settings_LOCALSTORAGE_KEY
} from '../constants/settings.constants';
import { FirePoints } from '../models/fire.points.model';
import { AppValues, Settings } from '../models/settings.model';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private _settings!: Settings;
  private _appValues!: AppValues;
  private _firePoints!: FirePoints[];

  private readonly httpClient = inject(HttpClient);

  constructor() {
    this.httpClient.get('fire.points.json').subscribe((data: Object) => {
      this._firePoints = (data as FirePoints[]) ?? [];
    });
  }

  public loadSettings(): void {
    this._settings = JSON.parse(
      localStorage.getItem(Settings_LOCALSTORAGE_KEY) ?? '{}'
    );
  }

  public saveSettings(): void {
    const settings = JSON.stringify(this._settings);
    localStorage.setItem(Settings_LOCALSTORAGE_KEY, settings);
  }

  public loadAppValues(): void {
    this._appValues = JSON.parse(
      localStorage.getItem(AppValues_LOCALSTORAGE_KEY) ?? '{}'
    );
  }

  public saveAppValues(): void {
    const appValues = JSON.stringify(this._appValues);
    localStorage.setItem(AppValues_LOCALSTORAGE_KEY, appValues);
  }

  get firePoints(): FirePoints[] {
    return this._firePoints;
  }

  get language(): LANGUAGES {
    return this._settings?.language ?? DEFAULT_LANGUAGE;
  }

  set language(value: LANGUAGES) {
    this._settings.language = value;
    this.saveSettings();
  }

  get gameDifficulty(): GAME_DIFFICULTY {
    return this._settings.gameDifficulty ?? DEFAULT_GAME_DIFFICULTY;
  }

  set gameDifficulty(value: GAME_DIFFICULTY) {
    this._settings.gameDifficulty = value;
    this.saveSettings();
  }

  get instructionsValues(): Partial<AppValues> {
    return {
      instructionsReaded: this._appValues?.instructionsReaded,
      noShowInstructionsReaded: this._appValues?.noShowInstructionsReaded,
    };
  }

  set instructionsValues(
    value: Partial<
      Pick<AppValues, 'instructionsReaded' | 'noShowInstructionsReaded'>
    >
  ) {
    this._appValues = {
      ...this._appValues,
      ...value,
    };
    this.saveAppValues();
  }
}
