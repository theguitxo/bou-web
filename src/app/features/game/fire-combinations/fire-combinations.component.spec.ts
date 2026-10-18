import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FireCombinationsPage } from './fire-combinations.component';
import { GameService } from '../../../core/services/game.service';
import { ModalService } from '../../../core/services/modal.service';

describe('FireCombinationsPage', () => {
  const points = new BehaviorSubject([{ translateKey: 'ONE' }, { translateKey: 'TWO' }]); const router = { navigate: vi.fn() }; const modal = { open: vi.fn() };
  beforeEach(async () => { await TestBed.configureTestingModule({ imports: [FireCombinationsPage], providers: [{ provide: GameService, useValue: { gameFirePoints: points.asObservable() } }, { provide: Router, useValue: router }, { provide: ModalService, useValue: modal }] }).overrideComponent(FireCombinationsPage, { set: { template: '' } }).compileComponents(); });
  it('creates and derives adjacent fire point labels', () => { const fixture = TestBed.createComponent(FireCombinationsPage); fixture.detectChanges(); const component = fixture.componentInstance; expect(component).toBeTruthy(); expect((component as any).nextPreviousButtonLabel().get(0)).toEqual({ next: 'TWO', previous: '' }); });
});
