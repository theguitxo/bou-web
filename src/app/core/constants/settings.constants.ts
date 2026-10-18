export const Settings_LOCALSTORAGE_KEY = 'settings';
export const AppValues_LOCALSTORAGE_KEY = 'appvalues';

export enum SETTINGS_OPTIONS {
  LANGUAGE = 'LANGUAGE',
  GAME_DIFFICULTY = 'GAME_DIFFICULTY',
}

export enum LANGUAGES {
  SPANISH = 'es',
  CATALAN = 'ca',
}

export const DEFAULT_LANGUAGE = LANGUAGES.CATALAN;

export enum GAME_DIFFICULTY {
  EASY,
  MEDIUM,
  HARD,
}

export const DEFAULT_GAME_DIFFICULTY = GAME_DIFFICULTY.EASY;

export const GAME_HELPS = 3;
export const GAME_HELP_DURATION = 10;
