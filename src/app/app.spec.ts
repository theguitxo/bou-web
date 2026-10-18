import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { App } from './app';
import { ImagePreloaderService } from './core/services/image.preloader.service';
import { SettingsService } from './core/services/settings.service';

describe('App', () => {
  let progress$: Subject<number>;
  let resolvePreload: () => void;
  let settingsService: {
    language: string;
    loadSettings: ReturnType<typeof vi.fn>;
    loadAppValues: ReturnType<typeof vi.fn>;
  };
  let translateService: { use: ReturnType<typeof vi.fn> };
  let preloader: {
    getDownloadProgress: ReturnType<typeof vi.fn>;
    preloadImages: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    progress$ = new Subject<number>();
    resolvePreload = () => {};
    settingsService = {
      language: 'ca',
      loadSettings: vi.fn(),
      loadAppValues: vi.fn(),
    };
    translateService = { use: vi.fn() };
    preloader = {
      getDownloadProgress: vi.fn(() => progress$.asObservable()),
      preloadImages: vi.fn(
        () => new Promise<void>((resolve) => (resolvePreload = resolve)),
      ),
    };

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: SettingsService, useValue: settingsService },
        { provide: TranslateService, useValue: translateService },
      ],
    })
      .overrideComponent(App, {
        set: {
          template: '',
          providers: [{ provide: ImagePreloaderService, useValue: preloader }],
        },
      })
      .compileComponents();
  });

  it('creates the app and initializes settings and language', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
    expect(settingsService.loadSettings).toHaveBeenCalledOnce();
    expect(settingsService.loadAppValues).toHaveBeenCalledOnce();
    expect(translateService.use).toHaveBeenCalledWith('ca');
  });

  it('updates the loading progress and finishes when preload resolves', async () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.ngOnInit();

    expect(preloader.getDownloadProgress).toHaveBeenCalledOnce();
    expect(preloader.preloadImages).toHaveBeenCalledWith(
      (app as any).imagesToPreload,
    );
    expect((app as any).isLoading()).toBe(true);

    progress$.next(0.42);
    expect((app as any).loadProgress()).toBe(42);

    resolvePreload();
    await Promise.resolve();

    expect((app as any).isLoading()).toBe(false);
  });
});
