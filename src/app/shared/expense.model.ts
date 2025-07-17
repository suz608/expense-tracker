export class Expense{
  category: string
  amount: number
  dateTime: string

  constructor(category: string, amount:number, dateTime:string){
    this.category = category
    this.amount = amount
    this.dateTime = dateTime
  }
}
