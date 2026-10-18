import { Component, computed, input } from "@angular/core";

@Component({
    selector: 'app-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrl: './progress-bar.component.scss'
})
export class AppProgressBarComponent {
    value = input<number>(0);

    percentValue = computed(() => {
        return `${this.value()}%`;
    });

}