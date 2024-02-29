import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItViewComponent } from './it-view.component';

describe('ItViewComponent', () => {
  let component: ItViewComponent;
  let fixture: ComponentFixture<ItViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItViewComponent]
    });
    fixture = TestBed.createComponent(ItViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
