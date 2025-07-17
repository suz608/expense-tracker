import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ExpenseService } from '../shared/expenses';
import { Expense } from '../shared/expense.model';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  DateTime: string;
  Amount: number;
  Category: string;
}

@Component({
  selector: 'app-expenses',
  imports: [AgGridModule, RouterLink, MatIcon],
  template: `
    <a routerLink="/" aria-label="Back to Home">
      <mat-icon class="icon" fontIcon="home"></mat-icon>
    </a>
    <ag-grid-angular
        style="height:500px"
        [rowData]="rowData"
        [columnDefs]="colDefs">
    </ag-grid-angular>
  `
})

export class Expenses implements OnInit {
  expenses: Expense[] = []

  rowData: RowData[] = [];
  colDefs: ColDef[] = [
    { field: "DateTime" },
    { field: "Amount" },
    { field: "Category" },
  ];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenses = this.expenseService.getExpenses();

    // Map the expenses to rowData that the ag-Grid will use
    this.rowData = this.expenses.map(expense => ({
      DateTime: expense.dateTime,
      Amount: expense.amount,
      Category: expense.category,
    }));
  }
}
