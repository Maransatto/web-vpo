import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Budget } from 'src/app/models/budget';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { ContextStore } from 'src/app/store/context-store';
import { ShowMessageService } from 'src/app/services/show-message.service';
import { BudgetCategory } from 'src/app/models/budgetCategory';


@Component({
  selector: 'app-budget-input',
  templateUrl: './budget-input.component.html',
  styleUrls: ['./budget-input.component.css']
})
export class BudgetInputComponent implements OnInit {

  @Input() budget: Budget;
  @Input() category: Category;

  @ViewChild('budgetInput', { static: true }) input: ElementRef;

  constructor(
    private contextStore: ContextStore,
    private showMessageService: ShowMessageService
  ) { }

  ngOnInit() {

    fromEvent(this.input.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((valor: number) => {
      const budgetValue = new BudgetCategory(
        this.budget.id_orcamento,
        this.category.id_categoria,
        valor
      );
      this.contextStore.changeBudgetValue(budgetValue)
        .catch((error) => {
          this.showMessageService.error(error);
        });
    });
  }
}
