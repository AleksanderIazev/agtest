import type { ChangeEvent, MouseEvent } from 'react';

export interface TableData {
  id: number;
  name: string; // title
  vendor: string; // brand
  article: string; // sku
  rate: number; // rating
  price: number; // price
}

export type Order = 'asc' | 'desc';

export interface HeadCell {
  disablePadding: boolean;
  id: keyof TableData;
  label: string;
  numeric: boolean;
}

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: MouseEvent<unknown>, property: keyof TableData) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: keyof TableData;
  rowCount: number;
}

export interface EnhancedTableToolbarProps {
  onAddClick: () => void;
}

export interface CustomTableProps {
  searchQuery?: string;
  onProductAdded?: () => void;
}

export interface FormattedPriceProps {
  price: number;
}

