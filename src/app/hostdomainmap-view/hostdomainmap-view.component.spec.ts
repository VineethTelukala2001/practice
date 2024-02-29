import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostdomainmapViewComponent } from './hostdomainmap-view.component';

describe('HostdomainmapViewComponent', () => {
  let component: HostdomainmapViewComponent;
  let fixture: ComponentFixture<HostdomainmapViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostdomainmapViewComponent]
    });
    fixture = TestBed.createComponent(HostdomainmapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
