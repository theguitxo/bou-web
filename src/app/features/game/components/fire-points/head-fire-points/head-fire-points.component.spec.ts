import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HeadFirePointsComponent } from './head-fire-points.component';
import { GameService } from '../../../../../core/services/game.service';

describe('HeadFirePointsComponent', () => {
  beforeEach(async () => { await TestBed.configureTestingModule({ imports: [HeadFirePointsComponent], providers: [{ provide: GameService, useValue: {} }, { provide: Router, useValue: { navigate: vi.fn() } }] }).overrideComponent(HeadFirePointsComponent, { set: { template: '' } }).compileComponents(); });
  it('creates and maps head points after initialization', () => { const fixture = TestBed.createComponent(HeadFirePointsComponent); fixture.componentRef.setInput('points', { BANYES: ['VOLCANET'], MORRO: [], CUA: [] }); fixture.detectChanges(); const component = fixture.componentInstance; expect(component).toBeTruthy(); expect((component as any).fireworkPointsValues().get(0)).toBe('VOLCANET'); });
});
