import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expense } from './expense.model';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService{
  expenses: Expense[] = [];
  private apiUrl = environment.apiUrl;  // Fetch API URL from the environment file

  constructor(private http: HttpClient) {
    // Fetch expenses from the API when the service is created
    this.fetchExpensesFromApi();
  }

  // Fetch expenses from the AWS API
  fetchExpensesFromApi() {
    this.http.get<Expense[]>(this.apiUrl).subscribe({
      next: (data) => {
        // Map the fetched data to ensure it fits the Expense model
        this.expenses = data;
      },
      error: (err) => {
        console.error('Error fetching expenses from API:', err);
      }
    });
  }

  // Other methods to manage expenses
  getExpenses() {
    return this.expenses;
  }

  addExpense(expense: Expense) {
    //return this.expenses;
  }

}
