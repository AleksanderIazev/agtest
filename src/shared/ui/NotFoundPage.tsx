import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      gap: 2,
      textAlign: 'center',
    }}
  >
    <Typography variant="h1" sx={{ fontSize: '4rem', fontWeight: 700, color: 'text.secondary' }}>
      404
    </Typography>
    <Typography variant="h5">Страница не найдена</Typography>
    <Typography color="text.secondary">
      Запрашиваемая страница не существует или была перемещена.
    </Typography>
    <Link to="/" style={{ marginTop: 16, color: 'inherit', textDecoration: 'underline' }}>
      Вернуться на главную
    </Link>
  </Box>
);
