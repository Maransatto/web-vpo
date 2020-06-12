import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionInputInflowComponent } from './transaction-input-inflow.component';

describe('TransactionInputInflowComponent', () => {
  let component: TransactionInputInflowComponent;
  let fixture: ComponentFixture<TransactionInputInflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionInputInflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionInputInflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
