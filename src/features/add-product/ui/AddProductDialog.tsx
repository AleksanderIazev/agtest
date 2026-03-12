import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export interface AddProductFormData {
  name: string;
  price: string;
  vendor: string;
  article: string;
}

interface AddProductDialogProps {
  open: boolean;
  formData: AddProductFormData;
  onClose: () => void;
  onFormChange: (
    field: keyof AddProductFormData
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  isSubmitDisabled: boolean;
}

export const AddProductDialog: React.FC<AddProductDialogProps> = ({
  open,
  formData,
  onClose,
  onFormChange,
  onSubmit,
  isSubmitDisabled,
}) => (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle>Добавить товар</DialogTitle>
    <DialogContent
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        pt: 1,
        height: '500px',
        justifyContent: 'center',
      }}
    >
      <TextField
        label="Наименование"
        value={formData.name}
        onChange={onFormChange('name')}
        fullWidth
      />
      <TextField
        label="Цена"
        type="number"
        value={formData.price}
        onChange={onFormChange('price')}
        fullWidth
      />
      <TextField
        label="Вендор"
        value={formData.vendor}
        onChange={onFormChange('vendor')}
        fullWidth
      />
      <TextField
        label="Артикул"
        value={formData.article}
        onChange={onFormChange('article')}
        fullWidth
      />
    </DialogContent>
    <DialogActions sx={{ px: 3, pb: 2 }}>
      <Button onClick={onClose}>Отмена</Button>
      <Button variant="contained" onClick={onSubmit} disabled={isSubmitDisabled}>
        Добавить
      </Button>
    </DialogActions>
  </Dialog>
);
