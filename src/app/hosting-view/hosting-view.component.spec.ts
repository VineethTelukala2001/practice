import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostingViewComponent } from './hosting-view.component';

describe('HostingViewComponent', () => {
  let component: HostingViewComponent;
  let fixture: ComponentFixture<HostingViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostingViewComponent]
    });
    fixture = TestBed.createComponent(HostingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
