import { Routes } from '@angular/router';
import { APP_ROUTES } from './core/constants/routes.constants';

export const routes: Routes = [
    {
        path: APP_ROUTES.HOME,
        loadComponent: () =>
            import('./features/home/home.component').then((m) => m.HomeComponent),
    },
    {
        path: APP_ROUTES.GAME,
        loadComponent: () =>
            import('./features/game/game.component').then((m) => m.GameComponent),
        children: [
            {
                path: APP_ROUTES.FIRE_POINTS_LIST,
                loadComponent: () =>
                    import(
                        './features/game/fire-points-list/fire-points-list.component'
                    ).then((m) => m.FirePointsListComponent),
            },
            {
                path: APP_ROUTES.GAME_FIRE_POINT,
                loadComponent: () =>
                    import(
                        './features/game/game-fire-point/game-fire-point.component'
                    ).then((m) => m.GameFirePointComponent),
            },
            {
                path: APP_ROUTES.FIREWORK_SELECTOR,
                loadComponent: () =>
                    import(
                        './features/game/firework-selector/firework-selector.component'
                    ).then((m) => m.FireworkSelectorComponent),
            },
            {
                path: APP_ROUTES.GAME_FIRE_VIDEO,
                loadComponent: () =>
                    import(
                        './features/game/game-fire-video/game-fire-video.component'
                    ).then((m) => m.GameFireVideoComponent),
            },
            {
                path: APP_ROUTES.GAME_SUMMARY,
                loadComponent: () =>
                    import('./features/game/game-summary/game-summary.component').then(
                        (m) => m.GameSummaryComponent
                    ),
            },
            {
                path: APP_ROUTES.FIRE_COMBINATIONS,
                loadComponent: () =>
                    import(
                        './features/game/fire-combinations/fire-combinations.component'
                    ).then((m) => m.FireCombinationsPage),
            },
            {
                path: '',
                redirectTo: APP_ROUTES.FIRE_COMBINATIONS,
                pathMatch: 'full',
            },
        ],
    },
    {
        path: APP_ROUTES.INSTRUCTIONS,
        loadComponent: () =>
            import('./features/instructions/instructions.component').then(
                (m) => m.InstructionsComponent
            ),
    },
    {
        path: APP_ROUTES.CONFIGURATION,
        loadComponent: () =>
            import('./features/settings/settings.component').then((m) => m.SettingsComponent),
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
];