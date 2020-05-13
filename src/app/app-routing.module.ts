import { IncomeExpenseReportComponent } from './reports/income-expense-report/income-expense-report.component';
import { NetWorthReportComponent } from './reports/net-worth-report/net-worth-report.component';
import { SpendingReportComponent } from './reports/spending-report/spending-report.component';
import { PayeesComponent } from './payees/payees.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ContextComponent } from './context/context.component';
import { BudgetComponent } from './budget/budget.component';
import { LayoutComponent } from './layout/layout.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'budget', pathMatch: 'full' },
  { path: '*', redirectTo: 'budget', pathMatch: 'full' },

  { path: 'signup', component: SignUpComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'budget', component: BudgetComponent },
      { path: 'context', component: ContextComponent },
      { path: 'transactions/all-accounts', component: TransactionsComponent },
      { path: 'transactions/account/:id_conta', component: TransactionsComponent },
      { path: 'payees', component: PayeesComponent},
      { path: 'spending', component: SpendingReportComponent},
      { path: 'net-worth', component: NetWorthReportComponent},
      { path: 'income-expense', component: IncomeExpenseReportComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
