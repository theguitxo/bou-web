import { HttpClient } from "@angular/common/http";
import { Component, DestroyRef, effect, inject, OnInit, signal, viewChild } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { EmblaCarouselType, EmblaEventType, EmblaOptionsType } from "embla-carousel";
import { EmblaCarouselDirective } from "embla-carousel-angular";
import { APP_ROUTES } from "../../core/constants/routes.constants";
import { InstructionsItem, InstructionsObject, InstructionsObjectData, InstructionsSlide } from "../../core/models/instructions.model";
import { SettingsService } from "../../core/services/settings.service";

@Component({
    selector: 'app-instructions',
    templateUrl: './instructions.component.html',
    styleUrl: './instructions.component.scss',
    imports: [TranslatePipe, EmblaCarouselDirective],
})
export class InstructionsComponent implements OnInit {
    readonly emblaRef = viewChild(EmblaCarouselDirective);

    private readonly router = inject(Router);
    private readonly httpClient = inject(HttpClient);
    private readonly destroyRef = inject(DestroyRef);
    private readonly sanitizer = inject(DomSanitizer);
    private readonly translateService = inject(TranslateService);
    private readonly settingsService = inject(SettingsService);

    protected slidesInfo = signal<InstructionsSlide[]>([]);

    protected options: EmblaOptionsType = {
        loop: false
    };

    readonly selectedIndex = signal(0);
    readonly scrollSnaps = signal<number[]>([]);

    public readonly subscribeToEvents: EmblaEventType[] = ['select', 'init', 'reInit'];
    private emblaApiRef: EmblaCarouselType | null | undefined;

    constructor() {
        effect(() => {
            this.emblaApiRef = this.emblaRef()?.emblaApi;
            if (!this.emblaApiRef) return;
        });
    }

    ngOnInit(): void {
        this.httpClient
            .get('instructions.json')
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((data: Object) => {
                this.setSlidesInfo(data as InstructionsObjectData[]) ?? [];
            });
    }

    // Evento disparado por la directiva de Embla (emblaChange)
    protected onEmblaChange(event: EmblaEventType): void {
        if (!this.emblaApiRef) return;

        if (event === 'select' || event === 'init' || event === 'reInit') {
            this.updateDotsState();
        }
    }

    // Navegar al slide especificado
    protected scrollTo(index: number): void {
        if (!this.emblaApiRef) return;

        // Nota: En Embla v9 el método es goTo(index), en v8 es scrollTo(index)
        if ('goTo' in this.emblaApiRef) {
            (this.emblaApiRef as any).goTo(index);
        } else {
            this.emblaApiRef.scrollTo(index);
        }
    }

    private updateDotsState(): void {
        this.selectedIndex.set(this.emblaApiRef?.selectedScrollSnap() ?? 0);
        this.scrollSnaps.set(this.emblaApiRef?.scrollSnapList() ?? []);
    }

    private setSlidesInfo(data: InstructionsObjectData[]): void {
        this.slidesInfo.set(
            data.map((item: InstructionsObjectData) => {
                return {
                    objects: item.objects?.map((data: InstructionsObject) =>
                        this.parseSlideInfo(data),
                    ),
                };
            }),
        );
    }

    private parseSlideInfo(data: InstructionsObject): InstructionsItem {
        const item: InstructionsItem = {
            type: data.type,
            value: this.parseValueFromSlideInfo(data),
            imageAlignement:
                data.imageAlignement ?? (data.type === 'image' ? 'center' : undefined),
        };

        return item;
    }

    private parseValueFromSlideInfo(data: InstructionsObject): string | SafeHtml {
        let value: string | SafeHtml;

        switch (data.type) {
            case 'title':
            case 'text':
                value = data.translationKey
                    ? this.translateService.instant(data.translationKey)
                    : '';
                break;
            case 'html':
                value = this.sanitizer.bypassSecurityTrustHtml(data.htmlContent ?? '');
                break;
            case 'image':
                if (!data.imageWithLang) {
                    value = data.url ?? '';
                } else {
                    const key = `url${this.settingsService.language?.toUpperCase()}`;
                    value = data[key as keyof InstructionsObject] ?? '';
                }
                break;
        }

        return value;
    }

    protected goHome(): void {
        this.router.navigate([APP_ROUTES.HOME]);
    }
}
