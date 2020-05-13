import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingReportComponent } from './spending-report.component';

describe('SpendingReportComponent', () => {
  let component: SpendingReportComponent;
  let fixture: ComponentFixture<SpendingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
