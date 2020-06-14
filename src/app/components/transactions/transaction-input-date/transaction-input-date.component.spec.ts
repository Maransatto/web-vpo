import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionInputDateComponent } from './transaction-input-date.component';

describe('TransactionInputDateComponent', () => {
  let component: TransactionInputDateComponent;
  let fixture: ComponentFixture<TransactionInputDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionInputDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionInputDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
