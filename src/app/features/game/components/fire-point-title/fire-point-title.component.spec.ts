import { TestBed } from '@angular/core/testing';
import { FirePointTitleComponent } from './fire-point-title.component';

describe('FirePointTitleComponent', () => {
  beforeEach(async () => { await TestBed.configureTestingModule({ imports: [FirePointTitleComponent] }).overrideComponent(FirePointTitleComponent, { set: { template: '' } }).compileComponents(); });
  it('creates and receives its fire point input', () => { const fixture = TestBed.createComponent(FirePointTitleComponent); const point = { id: '1', code: 'point' } as any; fixture.componentRef.setInput('gameFirePoint', point); fixture.detectChanges(); expect(fixture.componentInstance).toBeTruthy(); expect(fixture.componentInstance.gameFirePoint()).toBe(point); });
});
