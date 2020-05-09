import { BudgetComponent } from './budget/budget.component';
import { LayoutComponent } from './layout/layout.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: '*', redirectTo: 'signup', pathMatch: 'full' },

  { path: 'signup', component: SignUpComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'budget', component: BudgetComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
