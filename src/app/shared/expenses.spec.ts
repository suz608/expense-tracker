import { TestBed } from '@angular/core/testing';
import { ExpenseService } from './expenses';

describe('Expenses', () => {
  let service: ExpenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
