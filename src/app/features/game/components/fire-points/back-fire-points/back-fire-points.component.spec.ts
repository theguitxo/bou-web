import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BackFirePointsComponent } from './back-fire-points.component';
import { GameService } from '../../../../../core/services/game.service';

describe('BackFirePointsComponent', () => {
  beforeEach(async () => { await TestBed.configureTestingModule({ imports: [BackFirePointsComponent], providers: [{ provide: GameService, useValue: {} }, { provide: Router, useValue: { navigate: vi.fn() } }] }).overrideComponent(BackFirePointsComponent, { set: { template: '' } }).compileComponents(); });
  it('creates and maps tail points after initialization', () => { const fixture = TestBed.createComponent(BackFirePointsComponent); fixture.componentRef.setInput('points', { BANYES: [], MORRO: [], CUA: ['CRACKER', undefined, 'RONCADOR'] }); fixture.detectChanges(); const component = fixture.componentInstance; expect(component).toBeTruthy(); expect((component as any).fireworkPointsValues().get(9)).toBe('CRACKER'); });
});
