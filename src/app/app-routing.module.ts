import { AuthService } from './auth.service';
import { SignInComponent } from './sign-in/sign-in.component';
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
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: '*', redirectTo: 'signin', pathMatch: 'full' },

  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'budget', component: BudgetComponent, canActivate: [AuthService] },
      { path: 'context', component: ContextComponent, canActivate: [AuthService] },
      { path: 'transactions/all-accounts', component: TransactionsComponent, canActivate: [AuthService] },
      { path: 'transactions/account/:id_conta', component: TransactionsComponent, canActivate: [AuthService]},
      { path: 'payees', component: PayeesComponent, canActivate: [AuthService]},
      { path: 'spending', component: SpendingReportComponent, canActivate: [AuthService]},
      { path: 'net-worth', component: NetWorthReportComponent, canActivate: [AuthService]},
      { path: 'income-expense', component: IncomeExpenseReportComponent, canActivate: [AuthService]}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
