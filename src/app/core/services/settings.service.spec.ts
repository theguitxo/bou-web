import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppValues_LOCALSTORAGE_KEY, GAME_DIFFICULTY, LANGUAGES, Settings_LOCALSTORAGE_KEY } from '../constants/settings.constants';
import { SettingsService } from './settings.service';

describe('SettingsService', () => {
  let service: SettingsService;
  let http: HttpTestingController;
  let storage: Record<string, string>;

  beforeEach(() => {
    storage = {};
    vi.stubGlobal('localStorage', {
      getItem: vi.fn((key: string) => storage[key] ?? null),
      setItem: vi.fn((key: string, value: string) => storage[key] = value),
      clear: vi.fn(() => storage = {}),
    });
    TestBed.configureTestingModule({ providers: [SettingsService, provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(SettingsService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    vi.unstubAllGlobals();
  });

  it('loads fire points from the application asset', () => {
    const firePoints = [{ code: 'roquetes', order: 1, type: 'normal' }];

    http.expectOne('fire.points.json').flush(firePoints);

    expect(service.firePoints).toEqual(firePoints);
  });

  it('uses defaults until stored settings are loaded and persists setting changes', () => {
    http.expectOne('fire.points.json').flush([]);
    service.loadSettings();
    expect(service.language).toBe(LANGUAGES.CATALAN);
    expect(service.gameDifficulty).toBe(GAME_DIFFICULTY.EASY);

    localStorage.setItem(Settings_LOCALSTORAGE_KEY, JSON.stringify({ language: LANGUAGES.SPANISH, gameDifficulty: GAME_DIFFICULTY.HARD }));
    service.loadSettings();
    service.language = LANGUAGES.CATALAN;
    service.gameDifficulty = GAME_DIFFICULTY.MEDIUM;

    expect(service.language).toBe(LANGUAGES.CATALAN);
    expect(service.gameDifficulty).toBe(GAME_DIFFICULTY.MEDIUM);
    expect(JSON.parse(localStorage.getItem(Settings_LOCALSTORAGE_KEY)!)).toEqual({ language: LANGUAGES.CATALAN, gameDifficulty: GAME_DIFFICULTY.MEDIUM });
  });

  it('loads and merges instruction values before saving them', () => {
    http.expectOne('fire.points.json').flush([]);
    localStorage.setItem(AppValues_LOCALSTORAGE_KEY, JSON.stringify({ instructionsReaded: true, noShowFirePointsWarning: true }));

    service.loadAppValues();
    service.instructionsValues = { noShowInstructionsReaded: true };

    expect(service.instructionsValues).toEqual({ instructionsReaded: true, noShowInstructionsReaded: true });
    expect(JSON.parse(localStorage.getItem(AppValues_LOCALSTORAGE_KEY)!)).toEqual({ instructionsReaded: true, noShowInstructionsReaded: true, noShowFirePointsWarning: true });
  });
});
