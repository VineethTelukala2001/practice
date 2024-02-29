import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainViewComponent } from './domain-view.component';

describe('DomainViewComponent', () => {
  let component: DomainViewComponent;
  let fixture: ComponentFixture<DomainViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DomainViewComponent]
    });
    fixture = TestBed.createComponent(DomainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
