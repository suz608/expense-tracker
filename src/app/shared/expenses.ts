import { Injectable, OnDestroy } from '@angular/core';
import { Expense } from './expense.model';
import { Observable, Subscription, fromEvent, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService implements OnDestroy {
  expenses: Expense[] = [];

  // Explicitly type the storage event observable
  private storageEvent$: Observable<StorageEvent>;
  private storageEventSubscription!: Subscription;

  constructor() {
    this.loadState();

    // Define the observable for listening to storage events
    this.storageEvent$ = fromEvent<StorageEvent>(window, 'storage').pipe(
      filter(event => event.key === 'expenses'), // Filter for 'expenses' key
      filter(event => event.newValue !== null)   // Ensure there's a new value in localStorage
    );

    // Subscribe to the storage event observable
    this.storageEventSubscription = this.storageEvent$.subscribe(event => {
      const newExpenses = JSON.parse(event.newValue as string);
      if (newExpenses) {
        this.expenses = newExpenses;
      }
    });
  }

  // Observable method to listen for changes in localStorage
  getAppDataChanges(): Observable<any> {
    return this.storageEvent$.pipe(
      map(event => JSON.parse(event.newValue as string)) // Parse the new value
    );
  }

  // Cleanup when the service is destroyed
  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.storageEventSubscription) {
      this.storageEventSubscription.unsubscribe();
    }
  }

  // Other methods to manage expenses
  getExpenses() {
    return this.expenses;
  }

  addExpense(expense: Expense) {
    this.expenses.push(expense);
    this.saveState();
  }

  saveState() {
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }

  loadState() {
    try {
      const expensesInStorage = localStorage.getItem('expenses');

      if (expensesInStorage) {
        this.expenses = JSON.parse(expensesInStorage);
      } else {
        console.log('No expenses found in localStorage.');
      }

    } catch (e) {
      console.error('There was an error retrieving the expenses from localStorage:', e);
    }
  }
}
