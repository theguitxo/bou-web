import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { GameFirePoints } from '../../../../core/models/fire.points.model';

@Component({
    selector: 'app-fire-point-title',
    templateUrl: './fire-point-title.component.html',
    styleUrl: './fire-point-title.component.scss',
    imports: [
        TranslatePipe
    ]
})
export class FirePointTitleComponent {
    gameFirePoint = input.required<GameFirePoints>();
}
