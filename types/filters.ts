// types/filters.ts

export interface FilterState {
  categories: string[];
  maxPrice: number;
}

export const PRICE_MAX = 300;
export const DEFAULT_FILTERS: FilterState = { categories: [], maxPrice: PRICE_MAX };