import { ComponentRef } from "@angular/core";
import { Subject } from "rxjs";

export class ModalRef<R = unknown> {
    private readonly _closedSubject = new Subject<R | null>();
    readonly closed = this._closedSubject.asObservable();

    private componentRef!: ComponentRef<unknown>;
    private detachFromApp!: () => void;

    private _isOpen = false;

    constructor() {
        this._isOpen = true;
    }

    _setup(ref: ComponentRef<unknown>, detachFn: () => void): void {
        this.componentRef = ref;
        this.detachFromApp = detachFn;
    }

    close(result: R | null = null): void {
        setTimeout(() => {
            if (!this.componentRef || !this._isOpen) return;

            this._closedSubject.next(result);
            this._closedSubject.complete();

            this._isOpen = false;

            this.detachFromApp();
            this.componentRef.destroy();
        }, 0);
    }
}