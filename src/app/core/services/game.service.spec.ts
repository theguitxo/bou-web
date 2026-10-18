import { TestBed } from '@angular/core/testing';
import { FIREWORKS_COMBINATION, FIREWORKS_POINTS, NORMAL_COMBINATIONS, SPECIAL_COMBINATIONS } from '../constants/fireworks.contants';
import { GAME_DIFFICULTY, GAME_HELPS } from '../constants/settings.constants';
import { GameService } from './game.service';
import { SettingsService } from './settings.service';

describe('GameService', () => {
  let service: GameService;
  let settings: { firePoints: any[]; gameDifficulty: GAME_DIFFICULTY };

  beforeEach(() => {
    settings = {
      gameDifficulty: GAME_DIFFICULTY.EASY,
      firePoints: [
        { code: 'rambla', order: 2, type: FIREWORKS_COMBINATION.RAMBLA },
        { code: 'roquetes', order: 1, type: FIREWORKS_COMBINATION.NORMAL },
      ],
    };
    TestBed.configureTestingModule({ providers: [GameService, { provide: SettingsService, useValue: settings }] });
    service = TestBed.inject(GameService);
  });

  it('generates ordered game points with initial state, assets, and easy combinations', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    let points: any;
    let helps = 0;
    service.gameFirePoints.subscribe((value) => points = value);
    service.gameHelps.subscribe((value) => helps = value);

    service.generateGame();

    expect(helps).toBe(GAME_HELPS);
    expect(points.map((point: any) => point.code)).toEqual(['roquetes', 'rambla']);
    expect(points[0]).toMatchObject({ first: false, isCurrent: false, enabled: false, played: false, headerImage: 'img/fire_points/headers/roquetes.png', firePointTypeText: 'FIRE_POINT_CARD.NORMAL' });
    expect(points[1]).toMatchObject({ first: true, isCurrent: true, enabled: true, firePointTypeText: 'FIRE_POINT_CARD.SPECIAL', firePointTypeColor: '#2eba54' });
    expect(points[0].fireworksPoints).toEqual(NORMAL_COMBINATIONS[0]);
    expect(points[1].fireworksPoints).toEqual(SPECIAL_COMBINATIONS[0]);
    expect(points[0].playFireworksPoints).toEqual({ BANYES: [undefined, undefined], CUA: [undefined, undefined, undefined], MORRO: Array(7).fill(undefined) });
  });

  it('uses random combined patterns for medium and random-sized patterns for hard difficulty', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    settings.gameDifficulty = GAME_DIFFICULTY.MEDIUM;
    expect((service as any).generateFireWorkPoints(FIREWORKS_COMBINATION.NORMAL)).toEqual(NORMAL_COMBINATIONS[0]);
    settings.gameDifficulty = GAME_DIFFICULTY.HARD;
    const hard = (service as any).generateFireWorkPoints(FIREWORKS_COMBINATION.NORMAL);

    expect(hard.BANYES).toHaveLength(2);
    expect(hard.CUA).toHaveLength(3);
    expect(hard.MORRO).toHaveLength(7);
    expect(hard.MORRO.every((firework: string) => firework === 'CARRETILLA')).toBe(true);
  });

  it('updates slots, scores the current point, and enables the next point when played', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    let points: any;
    let current: any;
    let summaries: any;
    service.gameFirePoints.subscribe((value) => points = value);
    service.currentGamePoint.subscribe((value) => current = value);
    service.summaryScores.subscribe((value) => summaries = value);
    service.generateGame();

    service.setGamePlayFirework(FIREWORKS_POINTS.BANYES_1, 'VOLCANET');
    service.setGamePlayFirework(FIREWORKS_POINTS.MORRO_7, 'RONCADOR');
    service.checkPointScore();
    service.playCurrentFirePoint();

    expect(points[1].playFireworksPoints.BANYES[0]).toBe('VOLCANET');
    expect(points[1].playFireworksPoints.MORRO[6]).toBe('RONCADOR');
    expect(points[1].scores).toMatchObject({ BANYES: { score: 1, percentage: 50 }, MORRO: { score: 1, percentage: 100 / 7 }, CUA: { score: 0 }, TOTAL: { score: 2 } });
    expect(points[1]).toMatchObject({ isCurrent: false, enabled: false, played: true });
    expect(points[0].enabled).toBe(false);
    expect(current).toBeUndefined();
    expect(summaries[1].score).toBe(2);
  });

  it('tracks transient firework selection, help state, progress, and reset', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    let progress = 0;
    let checking = false;
    let helps = 0;
    let current: any;
    service.gpsCheckProgress.subscribe((value) => progress = value);
    service.chekingFirePoint.subscribe((value) => checking = value);
    service.gameHelps.subscribe((value) => helps = value);
    service.currentGamePoint.subscribe((value) => current = value);
    service.generateGame();
    service.setGamePlayFirework(FIREWORKS_POINTS.CUA_1, 'CARRETILLA');

    service.fireworkPlayedInfo = { firePosition: FIREWORKS_POINTS.CUA_1, firework: 'CARRETILLA', fireworkPosition: 'HEAD' };
    service.fireworkPlayedInfo = { firePosition: FIREWORKS_POINTS.BANYES_1, fireworkPosition: 'BACK' };
    service.updateGpsCheckProgress(75);
    service.updateCheckingFirePoint(true);
    service.useGameHelps();
    service.showGameHelp();

    expect(service.fireworkPlayedInfo).toEqual({ firePosition: FIREWORKS_POINTS.BANYES_1, firework: 'CARRETILLA', fireworkPosition: 'BACK' });
    expect(progress).toBe(75);
    expect(checking).toBe(true);
    expect(helps).toBe(GAME_HELPS - 1);
    expect(current.playFireworksPoints).toEqual(current.fireworksPoints);
    service.resetGameHelp();
    expect(current.playFireworksPoints.CUA[0]).toBe('CARRETILLA');
    service.fireworkPlayedInfo = undefined;
    service.finishGame();
    expect(service.fireworkPlayedInfo).toBeUndefined();
  });
});
