import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionInputComponent } from './transaction-input.component';

describe('TransactionInputComponent', () => {
  let component: TransactionInputComponent;
  let fixture: ComponentFixture<TransactionInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
