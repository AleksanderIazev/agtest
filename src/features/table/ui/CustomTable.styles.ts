import type { CSSProperties } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';

export const headerCheckboxSx: SxProps<Theme> = {
  color: 'rgba(178, 179, 185, 1)',
  '&.Mui-checked': { color: 'rgba(60, 83, 142, 1)' },
  '&.MuiCheckbox-indeterminate': { color: 'rgba(60, 83, 142, 1)' },
};

export const headCellSx: SxProps<Theme> = {
  color: 'rgba(178, 179, 185, 1)',
  fontWeight: 700,
  lineHeight: '30px',
};

export const tableSortLabelSx: SxProps<Theme> = {
  color: 'rgba(178, 179, 185, 1) !important',
  '&.Mui-active': {
    color: 'rgba(178, 179, 185, 1) !important',
  },
  '& .MuiTableSortLabel-icon': {
    display: 'none',
  },
  '&:hover': {
    color: 'rgba(178, 179, 185, 1) !important',
  },
};

export const toolbarSx: SxProps<Theme> = {
  pl: { sm: 2 },
  pr: { xs: 1, sm: 1 },
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '30px',
};

export const toolbarTitleSx: SxProps<Theme> = {
  color: 'rgba(51, 51, 51, 1)',
  fontFamily: 'Cairo, sans-serif',
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: '20px',
  letterSpacing: '0%',
  textAlign: 'left',
};

export const formattedPriceBoxSx: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'baseline',
};

const formattedPriceTypographyBase = {
  fontFamily: 'Roboto Mono, monospace',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '110%',
  letterSpacing: '0%',
};

export const formattedPriceTypographySx: SxProps<Theme> = {
  ...formattedPriceTypographyBase,
};

export const formattedPriceFractionalTypographySx: SxProps<Theme> = {
  ...formattedPriceTypographyBase,
  color: 'rgba(153, 153, 153, 1)',
};

export const loadingBoxSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '400px',
};

export const errorBoxSx: SxProps<Theme> = {
  p: 3,
};

export const rootBoxSx: SxProps<Theme> = {
  width: '100%',
  minWidth: 0,
  overflow: 'hidden',
};

export const paperSx: SxProps<Theme> = {
  width: '100%',
};

export const tableContainerSx: SxProps<Theme> = {
  width: '100%',
  overflowX: 'auto',
};

export const tableSx: SxProps<Theme> = {
  minWidth: 750,
  width: '100%',
};

export const nameCellSx: SxProps<Theme> = {
  width: '16.5%',
};

export const vendorCellSx: SxProps<Theme> = {
  width: '16.5%',
};

export const articleCellSx: SxProps<Theme> = {
  width: '16.5%',
};

export const rateCellSx: SxProps<Theme> = {
  width: '16.5%',
};

export const priceCellSx: SxProps<Theme> = {
  width: '20%',
};

export const actionsCellSx: SxProps<Theme> = {
  width: '13%',
};

export const rowCheckboxSx: SxProps<Theme> = {
  color: 'rgba(178, 179, 185, 1)',
  '&.Mui-checked': { color: 'rgba(60, 83, 142, 1)' },
};

export const actionsContainerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '30px',
};

export const getRateValueStyle = (rate: number): CSSProperties => ({
  color: rate < 3 ? '#f44336' : 'inherit',
});

export const rateMaxStyle: CSSProperties = {
  color: '#000000',
};

export const getEmptyRowStyle = (emptyRows: number): CSSProperties => ({
  height: 53 * emptyRows,
});
