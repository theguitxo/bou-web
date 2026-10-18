import {
    ApplicationRef,
    createComponent,
    EmbeddedViewRef,
    EnvironmentInjector,
    inject,
    Injectable,
    Injector,
    Type
} from '@angular/core';
import { ModalRef } from '../classes/modalref.class';

@Injectable({ providedIn: 'root' })
export class ModalService {
    private appRef = inject(ApplicationRef);
    private injector = inject(EnvironmentInjector);

    open<T, R = unknown>(component: Type<T>, inputs?: Record<string, unknown>): ModalRef<R | null> {
        const modalRef = new ModalRef<R>();

        const customInjector = Injector.create({
            providers: [
                { provide: ModalRef, useValue: modalRef }
            ],
            parent: this.injector
        });

        const componentRef = createComponent(component, {
            environmentInjector: this.injector,
            elementInjector: customInjector
        });

        if (inputs) {
            Object.entries(inputs).forEach(([key, value]) => {
                componentRef.setInput(key, value);
            });
        }

        this.appRef.attachView(componentRef.hostView);

        const viewRef = componentRef.hostView as EmbeddedViewRef<unknown>;
        const domElem = viewRef.rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);

        modalRef._setup(componentRef, () => {
            this.appRef.detachView(componentRef.hostView);
        });

        return modalRef;
    }
}