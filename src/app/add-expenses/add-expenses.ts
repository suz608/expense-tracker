import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Expense } from '../shared/expense.model';
import { ExpenseService } from '../shared/expenses';

@Component({
  selector: 'app-add-expense',
  imports: [FormsModule, RouterLink, CommonModule, MatIcon],
  templateUrl: './add-expenses.html',
  styleUrls: ['./add-expenses.scss']
})
export class AddExpenses{
  // Categories for the dropdown
  categories = ['Food', 'Housing', 'Commute', 'Health', 'Entertainment'];

  // Expense object to hold the data
  expense = {
    category: '',
    amount: null,
    dateTime: ''
  };

  isSaved = false; // For showing a confirmation message after saving

  constructor(private expenseService: ExpenseService) {}

  // Handle form submission
  onSubmit() {
    if (this.expense.category && this.expense.amount) {
      // Capture the current date and time
      const currentDateTime = new Date().toLocaleString(); // Formats as "MM/DD/YYYY, HH:mm:ss"
      this.expense.dateTime = currentDateTime;

      // Save the expense data (For now, we can log it to the console or save in localStorage)
      console.log('Expense Saved:', this.expense);

      // Show confirmation message
      this.isSaved = true;

      const newExpense = new Expense(this.expense.category,this.expense.amount,this.expense.dateTime);

      this.expenseService.addExpense(newExpense);
      // // Retrieve existing expenses from localStorage
      // const existingExpenses = this.expenseService.getExpenses();

      // // Add the new expense to the existing list
      // existingExpenses.push(newExpense);

      // // Save the updated list back to localStorage
      // localStorage.setItem('expenses', JSON.stringify(existingExpenses));

      // Reset the form
      this.expense = { category: '', amount: null, dateTime: '' };
    }
  }
}
