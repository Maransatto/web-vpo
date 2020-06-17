import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionInputAccountComponent } from './transaction-input-account.component';

describe('TransactionInputAccountComponent', () => {
  let component: TransactionInputAccountComponent;
  let fixture: ComponentFixture<TransactionInputAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionInputAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionInputAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
