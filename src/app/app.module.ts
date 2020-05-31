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
    SignInComponent
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
    AccountStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
