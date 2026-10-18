import { Component, computed, inject, input, OnInit, signal } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { ModalRef } from "../../core/classes/modalref.class";
import { ModalWrapperComponent } from "../modal-wrapper/modal-wrapper.component";

export type ConfirmModalResult = {
    leftButton: boolean;
    rightButton: boolean;
    checkValue: boolean;
} | null;

@Component({
    selector: 'app-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrl: './confirm-modal.component.scss',
    imports: [TranslatePipe, ModalWrapperComponent]
})
export class ConfirmModalComponent implements OnInit {
    private readonly translateService = inject(TranslateService);
    private readonly sanitizer = inject(DomSanitizer);
    private readonly modalRef = inject<ModalRef<ConfirmModalResult>>(ModalRef);

    showLeftButton = input<boolean>();
    leftButtonStr = input<string>();
    showRightButton = input<boolean>();
    rightButtonStr = input<string>();
    checkStr = input<string>('');
    contentJustified = input<boolean>();
    useTranslator = input<boolean>(true);
    content = input<string>('');

    protected trustedContent = signal<SafeHtml>('');
    protected showCheck = computed(() => !!this.checkStr());
    protected checkValue = false;

    ngOnInit(): void {
        this.trustedContent.set(
            this.sanitizer.bypassSecurityTrustHtml(
                this.useTranslator() ? this.translateService.instant(this.content()) : this.content()
            )
        )
    }

    protected handleButton(left: boolean): void {
        this.modalRef.close({
            leftButton: left,
            rightButton: !left,
            checkValue: this.checkValue
        });
    }

    protected onChangeCheck(event: Event): void {
        this.checkValue = (event?.target as HTMLInputElement)?.checked;
    }
}