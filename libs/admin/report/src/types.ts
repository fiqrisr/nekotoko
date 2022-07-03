export interface MonthlyReportResponse {
  date: Date;
  totalOrder: number;
  totalAmount: number;
}

export interface YearlyReportResponse {
  month: string;
  totalOrder: number;
  totalAmount: number;
}
