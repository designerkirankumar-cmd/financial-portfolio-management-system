export interface Investment {
    id: string;
    assetType: string;
    assetName: string;
    quantity: number;
    purchasePrice: number;
    currentPrice: number;
    purchaseDate: Date;
  }
  
export interface PortfolioSummary {
    totalValue: number;
    totalGainLoss: number;
    investments: Investment[];
}