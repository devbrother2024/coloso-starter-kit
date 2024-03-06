export interface TypeExchangeRate {
  id: number;
  baseCurrency: string;
  currency: string;
  exchangeRate: number;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export type TypeExchange = Pick<TypeExchangeRate, 'currency' | 'exchangeRate'>;
