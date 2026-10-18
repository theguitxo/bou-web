import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { GameFirePointComponent } from './game-fire-point.component';
import { GameService } from '../../../core/services/game.service';
import { ModalService } from '../../../core/services/modal.service';

describe('GameFirePointComponent', () => {
  const game = { fireworkPlayedInfo: { fireworkPosition: 'BACK' }, currentGamePoint: new BehaviorSubject(undefined), gameHelps: new BehaviorSubject(0), checkPointScore: vi.fn(), useGameHelps: vi.fn(), showGameHelp: vi.fn(), resetGameHelp: vi.fn() }; const router = { navigate: vi.fn() };
  beforeEach(async () => { await TestBed.configureTestingModule({ imports: [GameFirePointComponent], providers: [{ provide: GameService, useValue: game }, { provide: Router, useValue: router }, { provide: ModalService, useValue: { open: vi.fn() } }] }).overrideComponent(GameFirePointComponent, { set: { template: '' } }).compileComponents(); });
  it('creates, clears a pending selection, and reports exhausted helps', () => { const fixture = TestBed.createComponent(GameFirePointComponent); fixture.detectChanges(); const component = fixture.componentInstance; expect(component).toBeTruthy(); expect(game.fireworkPlayedInfo).toBeUndefined(); expect((component as any).disableGameHelps()).toBe(true); });
});
