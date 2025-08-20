import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Investment, PortfolioSummary } from '../models/investment.model';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  private investmentsSubject: BehaviorSubject<Investment[]> = new BehaviorSubject<Investment[]>([]);
  public investments$: Observable<Investment[]> = this.investmentsSubject.asObservable();

  private mockInvestments: Investment[] = [
    { id: '1', assetType: 'Stock', assetName: 'Alphabet Inc.', quantity: 10, purchasePrice: 150, currentPrice: 170, purchaseDate: new Date('2023-01-15') },
    { id: '2', assetType: 'Crypto', assetName: 'Bitcoin', quantity: 0.5, purchasePrice: 45000, currentPrice: 50000, purchaseDate: new Date('2023-03-20') },
    { id: '3', assetType: 'Stock', assetName: 'Apple Inc.', quantity: 20, purchasePrice: 160, currentPrice: 155, purchaseDate: new Date('2024-05-10') }
  ];

  constructor(private http: HttpClient) {
    this.investmentsSubject.next(this.mockInvestments);
  }

  getPortfolioData(): Observable<PortfolioSummary> {
    const currentInvestments: Investment[] = this.investmentsSubject.value;
    const totalValue: number = currentInvestments.reduce((sum: number, inv: Investment) => sum + (inv.quantity * inv.currentPrice), 0);
    const totalCost: number = currentInvestments.reduce((sum: number, inv: Investment) => sum + (inv.quantity * inv.purchasePrice), 0);
    const totalGainLoss: number = totalValue - totalCost;

    const summary: PortfolioSummary = {
      totalValue,
      totalGainLoss,
      investments: currentInvestments
    };

    return of(summary).pipe(delay(500));
  }


  addInvestment(newInvestment: Investment): void {
    const currentInvestments: Investment[] = this.investmentsSubject.value;
    const updatedInvestments: Investment[] = [...currentInvestments, newInvestment];
    this.investmentsSubject.next(updatedInvestments);
  }
}