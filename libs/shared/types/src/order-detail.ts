import {
  Order,
  OrderDetail as OrderDetailPrisma,
} from '@nekotoko/db-monolithic';

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

export interface OrderDetail extends Order {
  user: {
    id: string;
    username: string;
    full_name: string;
  };
  order_details: Array<
    OrderDetailPrisma & {
      product: {
        id: string;
        name: string;
        price: number;
        image: {
          url: string;
        }
      };
    }
  >;
}
