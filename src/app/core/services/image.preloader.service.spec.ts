import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ImagePreloaderService } from './image.preloader.service';

describe('ImagePreloaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ImagePreloaderService,
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('completes immediately and reports full progress when no images are supplied', async () => {
    const service = TestBed.inject(ImagePreloaderService);
    const progress: number[] = [];
    service.getDownloadProgress().subscribe((value) => progress.push(value));

    await service.preloadImages([]);

    expect(progress).toEqual([0, 1]);
  });

  it('counts successful and failed image loads and resolves after the display delay', async () => {
    vi.useFakeTimers();
    const images: Array<{
      onload: (() => void) | null;
      onerror: (() => void) | null;
      src: string;
    }> = [];
    vi.stubGlobal('Image', class {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      set src(value: string) {
        images.push({ onload: this.onload, onerror: this.onerror, src: value });
      }
    });
    const service = TestBed.inject(ImagePreloaderService);
    const progress: number[] = [];
    service.getDownloadProgress().subscribe((value) => progress.push(value));

    const complete = service.preloadImages(['one.png', 'two.png']);
    images[0].onload?.();
    images[1].onerror?.();
    await vi.advanceTimersByTimeAsync(5300);
    await complete;

    expect(images.map((image) => image.src)).toEqual(['one.png', 'two.png']);
    expect(progress).toEqual([0, 0.5, 1]);
  });
});
