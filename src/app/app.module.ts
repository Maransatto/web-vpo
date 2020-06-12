import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './components/layout/layout.component';
import { BudgetComponent } from './components/budget/budget.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { ContextComponent } from './components/context/context.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { PayeesComponent } from './components/payees/payees.component';
import { SpendingReportComponent } from './components/reports/spending-report/spending-report.component';
import { NetWorthReportComponent } from './components/reports/net-worth-report/net-worth-report.component';
import { IncomeExpenseReportComponent } from './components/reports/income-expense-report/income-expense-report.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ToastrModule } from 'ngx-toastr';
import { ContextStore } from './store/context-store';
import { UserStore } from './store/user-store';
import { GlobalStore } from './store/global-store';
import { AccountStore } from './store/account-store';
import { BudgetStore } from './store/budget-store';

import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { BudgetInputComponent } from './components/budget/budget-input/budget-input.component';
import { TransactionRowComponent } from './components/transactions/transaction-row/transaction-row.component';
import { TransactionInputInflowComponent } from './components/transactions/transaction-input-inflow/transaction-input-inflow.component';

registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LayoutComponent,
    BudgetComponent,
    SidebarComponent,
    HeaderComponent,
    ContextComponent,
    TransactionsComponent,
    PayeesComponent,
    SpendingReportComponent,
    NetWorthReportComponent,
    IncomeExpenseReportComponent,
    SignInComponent,
    BudgetInputComponent,
    TransactionRowComponent,
    TransactionInputInflowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    ContextStore,
    UserStore,
    GlobalStore,
    AccountStore,
    BudgetStore,
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
