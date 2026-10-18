import { Component, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { take } from 'rxjs';
import { ConfirmModalComponent, ConfirmModalResult } from '../../components/confirm-modal/confirm-modal.component';
import { ModalRef } from '../../core/classes/modalref.class';
import { APP_ROUTES } from '../../core/constants/routes.constants';
import { ModalService } from '../../core/services/modal.service';
import { SettingsService } from '../../core/services/settings.service';
import { LogoHomeComponent } from './components/logo-home/logo-home.component';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrl: './home.component.scss',
    imports: [TranslatePipe, LogoHomeComponent],
})
export class HomeComponent implements OnDestroy {
    private readonly settingsService = inject(SettingsService);
    private readonly modalService = inject(ModalService);
    private readonly router = inject(Router);

    private instructionsModal!: ModalRef<ConfirmModalResult>;

    ngOnDestroy(): void {
        this.instructionsModal?.close();
    }

    protected navigateConfiguration(): void {
        this.router.navigate([APP_ROUTES.CONFIGURATION]);
    }

    protected navigateInstructions(): void {
        this.router.navigate([APP_ROUTES.INSTRUCTIONS]);
    }

    private playGame(): void {
        this.router.navigate([APP_ROUTES.GAME]);
    }

    protected checkInstructionsValues(): void {
        const values = this.settingsService.instructionsValues;

        if (values.noShowInstructionsReaded || values.instructionsReaded) {
            this.playGame();
        } else {
            this.openCheckInstructionsModal();
        }
    }

    private openCheckInstructionsModal(): void {
        this.instructionsModal =
            this.modalService.open<ConfirmModalComponent, ConfirmModalResult>(ConfirmModalComponent, {
                "showLeftButton": true,
                "showRightButton": true,
                "leftButtonStr": "BUTTONS.YES",
                "rightButtonStr": "BUTTONS.NO",
                "content": 'CHECK_INSTRUCTIONS_MODAL.MESSAGE',
                "checkStr": "TXT.NOT_SHOW_AGAIN"
            });

        this.instructionsModal.closed
            .pipe(take(1))
            .subscribe((data: ConfirmModalResult) => {
                this.settingsService.instructionsValues = {
                    ...this.settingsService.instructionsValues,
                    noShowInstructionsReaded: data?.checkValue
                };
                if (data?.leftButton) {
                    this.navigateInstructions();
                } else if (data?.rightButton) {
                    this.playGame();
                }
            });
    }
}