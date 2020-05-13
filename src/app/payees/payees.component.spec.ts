import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayeesComponent } from './payees.component';

describe('PayeesComponent', () => {
  let component: PayeesComponent;
  let fixture: ComponentFixture<PayeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
