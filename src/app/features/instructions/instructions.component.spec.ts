import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { InstructionsComponent } from './instructions.component';
import { SettingsService } from '../../core/services/settings.service';

describe('InstructionsComponent', () => {
  const http = { get: vi.fn(() => of([{ objects: [{ type: 'text', translationKey: 'INTRO' }] }])) }; const router = { navigate: vi.fn() };
  beforeEach(async () => { await TestBed.configureTestingModule({ imports: [InstructionsComponent], providers: [{ provide: HttpClient, useValue: http }, { provide: Router, useValue: router }, { provide: DomSanitizer, useValue: { bypassSecurityTrustHtml: vi.fn((x) => x) } }, { provide: TranslateService, useValue: { instant: vi.fn(() => 'Translated') } }, { provide: SettingsService, useValue: { language: 'ca' } }] }).overrideComponent(InstructionsComponent, { set: { template: '' } }).compileComponents(); });
  it('creates and maps downloaded instruction slides', () => { const fixture = TestBed.createComponent(InstructionsComponent); fixture.detectChanges(); expect(fixture.componentInstance).toBeTruthy(); expect((fixture.componentInstance as any).slidesInfo()[0].objects[0].value).toBe('Translated'); });
});
