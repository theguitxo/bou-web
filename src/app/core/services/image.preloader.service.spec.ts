import { ImagePreloaderService } from './image.preloader.service';

describe('ImagePreloaderService', () => {
  afterEach(() => vi.useRealTimers());

  it('completes immediately and reports full progress when no images are supplied', async () => {
    const service = new ImagePreloaderService();
    const progress: number[] = [];
    service.getDownloadProgress().subscribe((value) => progress.push(value));

    await service.preloadImages([]);

    expect(progress).toEqual([0, 1]);
  });

  it('counts successful and failed image loads and resolves after the display delay', async () => {
    vi.useFakeTimers();
    const images: Array<{ onload: (() => void) | null; onerror: (() => void) | null; src: string }> = [];
    vi.stubGlobal('Image', class {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      set src(value: string) { images.push({ onload: this.onload, onerror: this.onerror, src: value }); }
    });
    const service = new ImagePreloaderService();
    const progress: number[] = [];
    service.getDownloadProgress().subscribe((value) => progress.push(value));

    const complete = service.preloadImages(['one.png', 'two.png']);
    images[0].onload!();
    images[1].onerror!();
    await vi.advanceTimersByTimeAsync(5300);
    await complete;

    expect(images.map((image) => image.src)).toEqual(['one.png', 'two.png']);
    expect(progress).toEqual([0, 0.5, 1]);
    vi.unstubAllGlobals();
  });
});
