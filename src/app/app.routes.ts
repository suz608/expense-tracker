import { Routes } from '@angular/router';
import { Expenses } from './expenses/expenses';
import { AddExpenses } from './add-expenses/add-expenses';
import { PieChart } from './pie-chart/pie-chart';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', component: Home},
  { path: 'expenses', component: Expenses},
  { path: 'expenses/add', component: AddExpenses},
  { path: 'pie-chart', component: PieChart},
];
