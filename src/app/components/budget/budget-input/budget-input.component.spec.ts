import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetInputComponent } from './budget-input.component';

describe('BudgetInputComponent', () => {
  let component: BudgetInputComponent;
  let fixture: ComponentFixture<BudgetInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
