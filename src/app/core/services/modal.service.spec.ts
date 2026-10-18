import { Component, Input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ModalService } from './modal.service';

@Component({ standalone: true, template: '<span>{{ title }}</span>' })
class TestModalComponent {
  @Input() title = '';
}

describe('ModalService', () => {
  afterEach(() => {
    document.querySelectorAll('ng-component').forEach((element) => element.remove());
    vi.useRealTimers();
  });

  it('creates a modal, passes inputs, appends it to the body, and removes it on close', () => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({ providers: [ModalService] });
    const service = TestBed.inject(ModalService);
    const closed = vi.fn();

    const modal = service.open<TestModalComponent, string>(TestModalComponent, { title: 'Hello' });
    modal.closed.subscribe(closed);
    TestBed.tick();

    expect(document.body.textContent).toContain('Hello');
    modal.close('accepted');
    vi.runAllTimers();

    expect(closed).toHaveBeenCalledWith('accepted');
    expect(document.body.textContent).not.toContain('Hello');
  });
});
