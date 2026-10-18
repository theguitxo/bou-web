import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HomeComponent } from './home.component';
import { SettingsService } from '../../core/services/settings.service';
import { ModalService } from '../../core/services/modal.service';

describe('HomeComponent', () => {
  const settings = { instructionsValues: { instructionsReaded: true } }; const router = { navigate: vi.fn() }; const modal = { open: vi.fn() };
  beforeEach(async () => { await TestBed.configureTestingModule({ imports: [HomeComponent], providers: [{ provide: SettingsService, useValue: settings }, { provide: Router, useValue: router }, { provide: ModalService, useValue: modal }] }).overrideComponent(HomeComponent, { set: { template: '' } }).compileComponents(); });
  it('creates and starts the game when instructions were read', () => {
    const component = TestBed.createComponent(HomeComponent).componentInstance; expect(component).toBeTruthy();
    (component as any).checkInstructionsValues(); expect(router.navigate).toHaveBeenCalled(); expect(modal.open).not.toHaveBeenCalled();
  });
});
