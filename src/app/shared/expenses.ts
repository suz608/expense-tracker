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
    this.http.get<any[]>(`${this.apiUrl}/expenses`).subscribe({
      next: (data) => {
        this.expenses = data.map(item => new Expense(
          item.category,
          Number(item.amount),
          item.dateTime,
          item.expenseId
        ));
      },
      error: (err) => {
        console.error('Error fetching expenses from API:', err);
      }
    });
  }


  // GET
  getExpenses() {
    return this.expenses;
  }

  // POST 
  addExpense(expense: Expense) {
    const expenseJson = {
      category: expense.category,
      amount: String(expense.amount),
      dateTime: expense.dateTime
    };
    return this.http.post( this.apiUrl, expenseJson).subscribe({
      next: (response) => {
        console.log('Expense successfully posted:', response);
        // Optionally update local list
        this.expenses.push(expense);
      },
      error: (error) => {
        console.error('Error posting expense:', error);
      }
    });
  }
  
}
