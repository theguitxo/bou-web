import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SettingsComponent } from './settings.component';
import { SettingsService } from '../../core/services/settings.service';
import { ModalService } from '../../core/services/modal.service';

describe('SettingsComponent', () => {
  const settings = { language: 'ca', gameDifficulty: 0 } as any;
  const router = { navigate: vi.fn() };
  const translate = { use: vi.fn() };
  const modal = { open: vi.fn() };
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SettingsComponent], providers: [{ provide: SettingsService, useValue: settings }, { provide: Router, useValue: router }, { provide: TranslateService, useValue: translate }, { provide: ModalService, useValue: modal }] }).overrideComponent(SettingsComponent, { set: { template: '' } }).compileComponents();
  });
  it('creates and changes the selected language', () => {
    const component = TestBed.createComponent(SettingsComponent).componentInstance;
    expect(component).toBeTruthy();
    (component as any).languageChange('es');
    expect(settings.language).toBe('es');
    expect(translate.use).toHaveBeenCalledWith('es');
  });
});
