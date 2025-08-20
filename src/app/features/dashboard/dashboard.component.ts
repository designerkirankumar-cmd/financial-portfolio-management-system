import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestmentService } from '../../core/services/investment.service';
import { CurrencyFormatPipe } from '../../core/pipes/currency-format.pipe';
import { HighlightDirective } from '../../core/directives/highlight.directive';
import { BehaviorSubject } from 'rxjs';
import { Investment, PortfolioSummary } from '../../core/models/investment.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CurrencyFormatPipe, HighlightDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  portfolioSummary: PortfolioSummary | null = null;
  assetAllocation: { type: string, value: number, percentage: number }[] = [];
  performanceData: number[] = [];
  isLoading = true;
  @Output() openModalEvent = new EventEmitter<void>();

  constructor(private investmentService: InvestmentService) { }

  ngOnInit(): void {
    this.investmentService.investments$.subscribe((investments: Investment[]) => {
      this.portfolioSummary = this.calculateSummary(investments);
      this.calculateAssetAllocation(investments);
      this.generatePerformanceData();
      this.isLoading = false;
    });
  }


  private calculateSummary(investments: Investment[]): PortfolioSummary {
    const totalValue: number = investments.reduce((sum: number, inv: Investment) => sum + (inv.quantity * inv.currentPrice), 0);
    const totalCost: number = investments.reduce((sum: number, inv: Investment) => sum + (inv.quantity * inv.purchasePrice), 0);
    const totalGainLoss: number = totalValue - totalCost;
    return { totalValue, totalGainLoss, investments };
  }


  generatePerformanceData(): void {
    this.performanceData = [1000, 1100, 1050, 1200, 1350, 1300, 1500];
  }


  calculateAssetAllocation(investments: Investment[]): void {
    const assetMap = new Map<string, number>();
    investments.forEach((inv: Investment) => {
      const currentValue: number = inv.quantity * inv.currentPrice;
      const total: number = assetMap.get(inv.assetType) || 0;
      assetMap.set(inv.assetType, total + currentValue);
    });

    const totalValue: number = investments.reduce((sum: number, inv: Investment) => sum + (inv.quantity * inv.currentPrice), 0);

    this.assetAllocation = Array.from(assetMap.entries()).map(([type, value]) => ({
      type,
      value,
      percentage: totalValue > 0 ? (value / totalValue) * 100 : 0
    }));
  }

  openModal() {
    this.openModalEvent.emit();
  }
}
