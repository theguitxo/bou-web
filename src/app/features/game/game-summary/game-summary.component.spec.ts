import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { GameSummaryComponent } from './game-summary.component';
import { GameService } from '../../../core/services/game.service';

describe('GameSummaryComponent', () => {
  const scores = new BehaviorSubject([{ score: 3 }, { score: 7 }]);
  beforeEach(async () => { await TestBed.configureTestingModule({ imports: [GameSummaryComponent], providers: [{ provide: GameService, useValue: { summaryScores: scores.asObservable() } }] }).overrideComponent(GameSummaryComponent, { set: { template: '' } }).compileComponents(); });
  it('creates and totals summary scores', () => { const component = TestBed.createComponent(GameSummaryComponent).componentInstance; expect(component).toBeTruthy(); expect((component as any).totalScore()).toBe(10); });
});
