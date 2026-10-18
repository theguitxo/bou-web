import { TestBed } from '@angular/core/testing';
import { AppProgressBarComponent } from './progress-bar.component';

describe('AppProgressBarComponent', () => {
  it('formats the input value as a percentage', async () => {
    await TestBed.configureTestingModule({
      imports: [AppProgressBarComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppProgressBarComponent);
    fixture.componentRef.setInput('value', 42);

    expect(fixture.componentInstance).toBeTruthy();
    expect((fixture.componentInstance as any).percentValue()).toBe('42%');
  });
});
