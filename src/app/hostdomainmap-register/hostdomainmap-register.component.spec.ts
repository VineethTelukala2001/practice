import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostdomainmapRegisterComponent } from './hostdomainmap-register.component';

describe('HostdomainmapRegisterComponent', () => {
  let component: HostdomainmapRegisterComponent;
  let fixture: ComponentFixture<HostdomainmapRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostdomainmapRegisterComponent]
    });
    fixture = TestBed.createComponent(HostdomainmapRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
