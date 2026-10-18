import { TestBed } from '@angular/core/testing';
import { FireworkInfoComponent } from './firework-info.component';
import { ModalRef } from '../../../../core/classes/modalref.class';

describe('FireworkInfoComponent', () => {
  const modalRef = { close: vi.fn() };
  beforeEach(async () => { await TestBed.configureTestingModule({ imports: [FireworkInfoComponent], providers: [{ provide: ModalRef, useValue: modalRef }] }).overrideComponent(FireworkInfoComponent, { set: { template: '' } }).compileComponents(); });
  it('creates and computes information for the input firework', () => { const fixture = TestBed.createComponent(FireworkInfoComponent); fixture.componentRef.setInput('firework', 'CRACKER'); fixture.detectChanges(); const component = fixture.componentInstance; expect(component).toBeTruthy(); expect((component as any).name()).toBe('FIREWORKS.CRACKER.NAME'); (component as any).closeModal(); expect(modalRef.close).toHaveBeenCalled(); });
});
