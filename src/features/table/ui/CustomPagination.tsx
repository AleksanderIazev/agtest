import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

// Стилизованный квадрат для номера страницы
const PageSquare = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ active }) => ({
  width: '30px',
  height: '30px',
  borderRadius: '4px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
  fontFamily: 'Cairo, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '26px',
  textAlign: 'left',
  transition: 'all 0.2s ease',

  ...(active
    ? {
        background: 'rgba(121, 127, 234, 1)',
        color: 'rgba(255, 255, 255, 1)',
        boxShadow: '0px 20px 50px 0px rgba(0, 0, 0, 0.12)',
      }
    : {
        border: '1px solid rgba(236, 236, 235, 1)',
        background: 'transparent',
        color: 'rgba(178, 179, 185, 1)',
        boxShadow: '0px 20px 50px 0px rgba(0, 0, 0, 0.12)',

        '&:hover': {
          background: 'rgba(121, 127, 234, 0.1)',
          borderColor: 'rgba(121, 127, 234, 0.5)',
        },
      }),
}));

// Стилизованная стрелка
const ArrowButton = styled(IconButton)({
  width: '30px',
  height: '30px',
  padding: 0,
  borderRadius: '4px',
  border: '1px solid rgba(236, 236, 235, 1)',
  color: 'rgba(178, 179, 185, 1)',

  '&:hover:not(:disabled)': {
    background: 'rgba(121, 127, 234, 0.1)',
    borderColor: 'rgba(121, 127, 234, 0.5)',
  },

  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

export const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  // Вычисляем отображаемый диапазон
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Функция для отображения номеров страниц
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5; // Максимальное количество отображаемых страниц

    if (totalPages <= maxVisiblePages) {
      // Если страниц мало, показываем все
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Всегда показываем первую страницу
      pages.push(1);

      // Определяем диапазон отображаемых страниц вокруг текущей
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Корректируем диапазон для краевых случаев
      if (currentPage <= 3) {
        // Если мы в начале, показываем первые 4 страницы
        start = 2;
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        // Если мы в конце, показываем последние 4 страницы
        start = totalPages - 3;
        end = totalPages - 1;
      }

      // Добавляем многоточие после первой страницы если нужно
      if (start > 2) {
        pages.push('ellipsis-start');
      }

      // Добавляем страницы в середине
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Добавляем многоточие перед последней страницей если нужно
      if (end < totalPages - 1) {
        pages.push('ellipsis-end');
      }

      // Всегда показываем последнюю страницу
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  // Если нет элементов, не показываем пагинацию
  if (totalItems === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        py: 4,
        px: 4,
      }}
    >
      {/* Левая часть - информация о количестве */}
      <Typography
        sx={{
          fontFamily: 'Roboto, sans-serif',
          fontSize: '18px',
          fontWeight: 400,
          lineHeight: '21px',
          textAlign: 'left',
          color: 'rgba(150, 155, 159, 1)',
        }}
      >
        Показано {startItem}-{endItem} из {totalItems}
      </Typography>

      {/* Правая часть - пагинация */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* Стрелка влево */}
        <ArrowButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handlePrevPage();
          }}
          disabled={currentPage === 1}
          sx={{ border: 'none', flexShrink: 0 }}
        >
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 1L2 6L7 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </ArrowButton>

        {/* Номера страниц */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 1 }}>
          {getPageNumbers().map((page, index) => {
            if (page === 'ellipsis-start' || page === 'ellipsis-end') {
              // Отображаем многоточие
              return (
                <Typography
                  key={`${page}-${index}`}
                  sx={{
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Cairo, sans-serif',
                    fontSize: '14px',
                    color: 'rgba(178, 179, 185, 1)',
                  }}
                >
                  ...
                </Typography>
              );
            }

            return (
              <PageSquare
                key={page}
                active={page === currentPage}
                onClick={() => handlePageClick(page as number)}
              >
                {page}
              </PageSquare>
            );
          })}
        </Box>

        {/* Стрелка вправо */}
        <ArrowButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleNextPage();
          }}
          disabled={currentPage === totalPages}
          sx={{ border: 'none', flexShrink: 0 }}
        >
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </ArrowButton>
      </Box>
    </Box>
  );
};
