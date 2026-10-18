import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { GameComponent } from './game.component';
import { GameService } from '../../core/services/game.service';
import { ModalService } from '../../core/services/modal.service';

describe('GameComponent', () => {
  const allPlayed = new BehaviorSubject(false); const checking = new BehaviorSubject(false); const closed = new Subject<any>();
  const game = { allPlayed: allPlayed.asObservable(), chekingFirePoint: checking.asObservable(), generateGame: vi.fn() };
  const router = { navigate: vi.fn() }; const modal = { open: vi.fn(() => ({ closed: closed.asObservable(), close: vi.fn() })) };
  beforeEach(async () => { await TestBed.configureTestingModule({ imports: [GameComponent], providers: [{ provide: GameService, useValue: game }, { provide: Router, useValue: router }, { provide: ModalService, useValue: modal }] }).overrideComponent(GameComponent, { set: { template: '' } }).compileComponents(); });
  it('creates, generates a game, and confirms an unfinished exit', () => {
    const fixture = TestBed.createComponent(GameComponent); fixture.detectChanges(); const component = fixture.componentInstance;
    expect(component).toBeTruthy(); expect(game.generateGame).toHaveBeenCalled();
    (component as any).checkExitGameModal(); closed.next({ leftButton: true });
    expect(router.navigate).toHaveBeenCalled();
  });
});
