export class Expense {
  category: string;
  amount: number;
  dateTime: string;
  expenseId?: string;

  constructor(category: string, amount: number, dateTime: string, expenseId?: string) {
    this.category = category;
    this.amount = amount;
    this.dateTime = dateTime;
    if (expenseId) {
      this.expenseId = expenseId;
    }
  }
}
