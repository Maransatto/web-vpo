import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './layout/layout.component';
import { BudgetComponent } from './budget/budget.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { ContextComponent } from './context/context.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { PayeesComponent } from './payees/payees.component';
import { SpendingReportComponent } from './reports/spending-report/spending-report.component';
import { NetWorthReportComponent } from './reports/net-worth-report/net-worth-report.component';
import { IncomeExpenseReportComponent } from './reports/income-expense-report/income-expense-report.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from './sign-in/sign-in.component';
import { ToastrModule } from 'ngx-toastr';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
