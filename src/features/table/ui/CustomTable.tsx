import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { IconButton, TableRow } from '@mui/material';
import { useGetProductsQuery } from '../../../entities/apiProductSlice';
import type { Product } from '../types/product.types';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { CustomPagination } from './CustomPagination';
import styles from './CustomTable.module.scss';
import { AddProductDialog, type AddProductFormData } from '../../add-product';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PendingIcon from '@mui/icons-material/Pending';
import CachedIcon from '@mui/icons-material/Cached';
import {
  type CustomTableProps,
  type EnhancedTableProps,
  type EnhancedTableToolbarProps,
  type FormattedPriceProps,
  type TableData,
  type HeadCell,
  type Order,
} from './CustomTable.types';
import {
  actionsCellSx,
  actionsContainerStyle,
  articleCellSx,
  errorBoxSx,
  formattedPriceBoxSx,
  formattedPriceFractionalTypographySx,
  formattedPriceTypographySx,
  getEmptyRowStyle,
  getRateValueStyle,
  headCellSx,
  loadingBoxSx,
  nameCellSx,
  paperSx,
  priceCellSx,
  rateCellSx,
  rateMaxStyle,
  rootBoxSx,
  rowCheckboxSx,
  tableContainerSx,
  tableSx,
  toolbarSx,
  toolbarTitleSx,
  vendorCellSx,
  headerCheckboxSx,
  tableSortLabelSx,
} from './CustomTable.styles';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Наименование',
  },
  {
    id: 'vendor',
    numeric: false,
    disablePadding: false,
    label: 'Вендор',
  },
  {
    id: 'article',
    numeric: false,
    disablePadding: false,
    label: 'Артикул',
  },
  {
    id: 'rate',
    numeric: true,
    disablePadding: false,
    label: 'Оценка',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Цена, ₽',
  },
];

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

  const createSortHandler = (property: keyof TableData) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            sx={headerCheckboxSx}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            disableRipple
          />
        </TableCell>
        {headCells.map((headCell, idx) => (
          <TableCell
            key={headCell.id}
            align={idx === 0 ? 'left' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={headCellSx}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              hideSortIcon // Скрываем иконку сортировки полностью
              sx={tableSortLabelSx}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell padding="checkbox" />
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar({ onAddClick }: EnhancedTableToolbarProps) {
  return (
    <Toolbar sx={toolbarSx}>
      <Typography sx={toolbarTitleSx} id="tableTitle" component="div">
        Все позиции
      </Typography>
      <div className={styles.toolbarButtonWrapper}>
        <button type="button" className={styles.toolbarRefreshButton}>
          <CachedIcon />
        </button>
        <button type="button" className={styles.addProductButton} onClick={onAddClick}>
          <AddCircleOutlineIcon />
          Добавить
        </button>
      </div>
    </Toolbar>
  );
}

// Компонент для форматирования цены
const FormattedPrice = ({ price }: FormattedPriceProps) => {
  const formatPrice = (price: number) => {
    const [integerPart, fractionalPart] = price.toFixed(2).split('.');
    const formattedInteger = new Intl.NumberFormat('ru-RU').format(Number(integerPart));
    return { integer: formattedInteger, fractional: fractionalPart };
  };

  const { integer, fractional } = formatPrice(price);

  return (
    <Box sx={formattedPriceBoxSx}>
      <Typography component="span" sx={formattedPriceTypographySx}>
        {integer}
      </Typography>
      <Typography component="span" sx={formattedPriceFractionalTypographySx}>
        ,{fractional}
      </Typography>
    </Box>
  );
};

// Функция для преобразования Product в TableData
const mapProductToTableData = (product: Product): TableData => ({
  id: product.id,
  name: product.title,
  vendor: product.brand || 'Бренд не указан',
  article: product.sku || 'Артикул не указан',
  rate: product.rating,
  price: product.price,
});

export const CustomTable = ({ searchQuery = '', onProductAdded }: CustomTableProps) => {
  const { data, isLoading, error } = useGetProductsQuery(searchQuery.trim() || undefined);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof TableData>('name');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 5; // фиксированный размер страницы

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const [addDialogOpen, setAddDialogOpen] = React.useState(false);
  const [addForm, setAddForm] = React.useState<AddProductFormData>({
    name: '',
    price: '',
    vendor: '',
    article: '',
  });

  // Преобразуем данные в формат таблицы
  const tableRows = React.useMemo(() => {
    if (!data?.products) return [];
    return data.products.map(mapProductToTableData);
  }, [data]);

  const totalPages = Math.ceil(tableRows.length / pageSize);
  React.useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: keyof TableData) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setCurrentPage(1); // сбрасываем на первую страницу при сортировке
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = tableRows.map((row) => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleAddProductClick = () => {
    setAddForm({ name: '', price: '', vendor: '', article: '' });
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  const handleAddFormChange =
    (field: keyof AddProductFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setAddForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleAddSubmit = () => {
    const isValid =
      addForm.name.trim() &&
      addForm.price.trim() &&
      addForm.vendor.trim() &&
      addForm.article.trim();
    if (!isValid) return;
    setAddDialogOpen(false);
    onProductAdded?.();
    setAddForm({ name: '', price: '', vendor: '', article: '' });
  };

  // Вычисляем видимые строки с учётом текущей страницы
  const visibleRows = React.useMemo(() => {
    if (!tableRows.length) return [];

    const sortedRows = [...tableRows].sort(getComparator(order, orderBy));
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return sortedRows.slice(startIndex, endIndex);
  }, [tableRows, order, orderBy, currentPage, pageSize]);

  // Пустые строки для сохранения высоты
  const emptyRows = pageSize - visibleRows.length;

  // Функция для форматирования оценки
  const formatRate = (rate: number) => {
    return rate.toFixed(1);
  };

  // Состояния загрузки и ошибки
  if (isLoading) {
    return (
      <Box sx={loadingBoxSx}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={errorBoxSx}>
        <Alert severity="error">Ошибка при загрузке данных: {JSON.stringify(error)}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={rootBoxSx}>
      <Paper sx={paperSx}>
        <EnhancedTableToolbar onAddClick={handleAddProductClick} />
        <TableContainer sx={tableContainerSx}>
          <Table sx={tableSx} aria-labelledby="tableTitle" size={'medium'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={tableRows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    className={`${styles.rowCustomStyles} ${isItemSelected ? styles.rowSelected : ''}`}
                  >
                    <TableCell padding="checkbox" className={styles.firstCell}>
                      <Checkbox sx={rowCheckboxSx} disableRipple checked={isItemSelected} />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      sx={nameCellSx}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="center" sx={vendorCellSx}>
                      {row.vendor}
                    </TableCell>
                    <TableCell align="center" sx={articleCellSx}>
                      {row.article}
                    </TableCell>
                    <TableCell align="center" sx={rateCellSx}>
                      <span style={getRateValueStyle(row.rate)}>{formatRate(row.rate)}</span>
                      <span style={rateMaxStyle}>/5</span>
                    </TableCell>
                    <TableCell align="center" sx={priceCellSx}>
                      <FormattedPrice price={row.price} />
                    </TableCell>
                    <TableCell
                      sx={actionsCellSx}
                      padding="checkbox"
                      onClick={(e) => e.stopPropagation()}
                      align="left"
                    >
                      <div style={actionsContainerStyle}>
                        <button type="button" className={styles.addButton} aria-label="Добавить">
                          +
                        </button>
                        <IconButton aria-label="delete" disabled color="secondary">
                          <PendingIcon />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={getEmptyRowStyle(emptyRows)}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={tableRows.length}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </Paper>

      <AddProductDialog
        open={addDialogOpen}
        formData={addForm}
        onClose={handleAddDialogClose}
        onFormChange={handleAddFormChange}
        onSubmit={handleAddSubmit}
        isSubmitDisabled={
          !addForm.name.trim() ||
          !addForm.price.trim() ||
          !addForm.vendor.trim() ||
          !addForm.article.trim()
        }
      />
    </Box>
  );
};
