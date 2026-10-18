import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FirePointsListComponent } from './fire-points-list.component';
import { GameService } from '../../../core/services/game.service';

describe('FirePointsListComponent', () => {
  const game = { enabledGamePoint: new BehaviorSubject(undefined), gameFirePoints: new BehaviorSubject([]), chekingFirePoint: new BehaviorSubject(false), setCurrentGamePoint: vi.fn() }; const router = { navigate: vi.fn() };
  beforeEach(async () => { await TestBed.configureTestingModule({ imports: [FirePointsListComponent], providers: [{ provide: GameService, useValue: game }, { provide: Router, useValue: router }] }).overrideComponent(FirePointsListComponent, { set: { template: '' } }).compileComponents(); });
  it('creates and opens the selected fire point', () => { const component = TestBed.createComponent(FirePointsListComponent).componentInstance; const point = { id: '1', code: 'a' } as any; expect(component).toBeTruthy(); (component as any).playPoint(point); expect(game.setCurrentGamePoint).toHaveBeenCalledWith(point); expect(router.navigate).toHaveBeenCalled(); });
});
