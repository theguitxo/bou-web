import { Component, input } from "@angular/core";

@Component({
    selector: 'app-modal-wrapper',
    templateUrl: './modal-wrapper.component.html',
    styleUrl: './modal-wrapper.component.scss'
})
export class ModalWrapperComponent {
    width = input<string>();
}