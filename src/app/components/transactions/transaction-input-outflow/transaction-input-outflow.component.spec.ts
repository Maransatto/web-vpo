import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionInputOutflowComponent } from './transaction-input-outflow.component';

describe('TransactionInputOutflowComponent', () => {
  let component: TransactionInputOutflowComponent;
  let fixture: ComponentFixture<TransactionInputOutflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionInputOutflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionInputOutflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
