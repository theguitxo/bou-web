import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { GameFireVideoComponent } from './game-fire-video.component';
import { GameService } from '../../../core/services/game.service';

describe('GameFireVideoComponent', () => {
  const current = new BehaviorSubject({ code: 'pl_nova' }); const allPlayed = new BehaviorSubject(true); const game = { currentGamePoint: current.asObservable(), allPlayed: allPlayed.asObservable(), playCurrentFirePoint: vi.fn() }; const router = { navigate: vi.fn() };
  beforeEach(async () => { await TestBed.configureTestingModule({ imports: [GameFireVideoComponent], providers: [{ provide: GameService, useValue: game }, { provide: Router, useValue: router }] }).overrideComponent(GameFireVideoComponent, { set: { template: '' } }).compileComponents(); });
  it('creates, builds its video URL, and completes the point', () => { const component = TestBed.createComponent(GameFireVideoComponent).componentInstance; expect(component).toBeTruthy(); expect((component as any).videoUrl()).toBe('video/fire_points/pl_nova.mp4'); (component as any).videoEnded(); expect(game.playCurrentFirePoint).toHaveBeenCalled(); expect(router.navigate).toHaveBeenCalled(); });
});
