import { DomSanitizer } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { ModalRef } from '../../core/classes/modalref.class';
import { ConfirmModalComponent } from './confirm-modal.component';

describe('ConfirmModalComponent', () => {
  it('translates content and closes with the selected button result', async () => {
    const modalRef = { close: vi.fn() };
    const sanitizer = { bypassSecurityTrustHtml: vi.fn((value) => value) };
    const translateService = { instant: vi.fn(() => 'Translated content') };

    await TestBed.configureTestingModule({
      imports: [ConfirmModalComponent],
      providers: [
        { provide: ModalRef, useValue: modalRef },
        { provide: DomSanitizer, useValue: sanitizer },
        { provide: TranslateService, useValue: translateService },
      ],
    })
      .overrideComponent(ConfirmModalComponent, { set: { template: '' } })
      .compileComponents();

    const fixture = TestBed.createComponent(ConfirmModalComponent);
    fixture.componentRef.setInput('content', 'MODAL.CONTENT');
    fixture.componentInstance.ngOnInit();
    (fixture.componentInstance as any).onChangeCheck({
      target: { checked: true },
    } as unknown as Event);
    (fixture.componentInstance as any).handleButton(true);

    expect(translateService.instant).toHaveBeenCalledWith('MODAL.CONTENT');
    expect(sanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(
      'Translated content',
    );
    expect(modalRef.close).toHaveBeenCalledWith({
      leftButton: true,
      rightButton: false,
      checkValue: true,
    });
  });
});
