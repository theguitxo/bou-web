import { TestBed } from '@angular/core/testing';
import { ModalWrapperComponent } from './modal-wrapper.component';

describe('ModalWrapperComponent', () => {
  it('accepts a custom modal width', async () => {
    await TestBed.configureTestingModule({
      imports: [ModalWrapperComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(ModalWrapperComponent);
    fixture.componentRef.setInput('width', '480px');

    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.componentInstance.width()).toBe('480px');
  });
});
