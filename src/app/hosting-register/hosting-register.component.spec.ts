import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostingRegisterComponent } from './hosting-register.component';

describe('HostingRegisterComponent', () => {
  let component: HostingRegisterComponent;
  let fixture: ComponentFixture<HostingRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostingRegisterComponent]
    });
    fixture = TestBed.createComponent(HostingRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
