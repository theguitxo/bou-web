import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FireworkSelectorComponent } from './firework-selector.component';
import { GameService } from '../../../core/services/game.service';

describe('FireworkSelectorComponent', () => {
  const game = { fireworkPlayedInfo: { firePosition: 1 }, setGamePlayFirework: vi.fn() }; const router = { navigate: vi.fn() };
  beforeEach(async () => { await TestBed.configureTestingModule({ imports: [FireworkSelectorComponent], providers: [{ provide: GameService, useValue: game }, { provide: Router, useValue: router }] }).overrideComponent(FireworkSelectorComponent, { set: { template: '' } }).compileComponents(); });
  it('creates and saves a selected firework before returning', () => { const component = TestBed.createComponent(FireworkSelectorComponent).componentInstance; expect(component).toBeTruthy(); (component as any).selectFirework('CRACKER'); expect(game.setGamePlayFirework).toHaveBeenCalledWith(1, 'CRACKER'); expect(router.navigate).toHaveBeenCalled(); });
});
