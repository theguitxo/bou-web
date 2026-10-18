import { Component, DestroyRef, inject, OnDestroy, OnInit } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Router, RouterModule } from "@angular/router";
import { TranslatePipe } from "@ngx-translate/core";
import { take } from "rxjs";
import { ConfirmModalComponent, ConfirmModalResult } from "../../components/confirm-modal/confirm-modal.component";
import { ModalRef } from "../../core/classes/modalref.class";
import { APP_ROUTES } from "../../core/constants/routes.constants";
import { GameService } from "../../core/services/game.service";
import { ModalService } from "../../core/services/modal.service";

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrl: './game.component.scss',
    imports: [TranslatePipe, RouterModule]
})
export class GameComponent implements OnInit, OnDestroy {
    private readonly gameService = inject(GameService);
    private readonly router = inject(Router);
    private readonly modalService = inject(ModalService);
    private readonly destroyRef = inject(DestroyRef);

    private allPlayed = toSignal(this.gameService.allPlayed);
    protected checkingFirePoint = toSignal(this.gameService.chekingFirePoint);

    private exitGameModal!: ModalRef<ConfirmModalResult>;

    ngOnInit(): void {
        this.gameService.generateGame();
    }

    ngOnDestroy(): void {
        this.exitGameModal?.close();
    }

    protected checkExitGameModal(): void {
        if (this.allPlayed()) {
            this.exitGame();
        } else {
            this.openExitGameModal();
        }
    }

    private exitGame(): void {
        this.router.navigate([APP_ROUTES.HOME]);
    }

    private openExitGameModal(): void {
        this.exitGameModal =
            this.modalService.open<ConfirmModalComponent, ConfirmModalResult>(ConfirmModalComponent, {
                "showLeftButton": true,
                "showRightButton": true,
                "leftButtonStr": "BUTTONS.YES",
                "rightButtonStr": "BUTTONS.NO",
                "content": 'EXIT_GAME_MODAL.TITLE',
            });

        this.exitGameModal.closed
            .pipe(take(1))
            .subscribe((data: ConfirmModalResult) => {
                if (data?.leftButton) {
                    this.exitGame();
                }
            });
    }
}