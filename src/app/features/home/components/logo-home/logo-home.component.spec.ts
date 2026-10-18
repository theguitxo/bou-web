import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { LogoHomeComponent } from './logo-home.component';
import { TranslateService } from '@ngx-translate/core';

describe('LogoHomeComponent', () => {
  const langChanges = new Subject<any>(); const translate = { getCurrentLang: vi.fn(() => 'ca'), onLangChange: langChanges.asObservable() };
  beforeEach(async () => { await TestBed.configureTestingModule({ imports: [LogoHomeComponent], providers: [{ provide: TranslateService, useValue: translate }] }).overrideComponent(LogoHomeComponent, { set: { template: '' } }).compileComponents(); });
  it('creates and updates its language state from translation events', () => { const fixture = TestBed.createComponent(LogoHomeComponent); fixture.detectChanges(); const component = fixture.componentInstance; expect(component).toBeTruthy(); expect((component as any).isCatalan()).toBe(true); langChanges.next({ lang: 'es' }); expect((component as any).isSpanish()).toBe(true); });
});
