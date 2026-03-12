import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../shared/lib/ProtectedRoute';
import { Auth } from '../features/auth/ui/Auth';
import { ProductsPage } from '../pages/products';
import { NotFoundPage } from '../shared/ui/NotFoundPage';
import { useAuth } from '../shared/lib/AuthContext';

export const AppLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="app">Загрузка...</div>;
  }

  return (
    <div className="app">
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/table" replace /> : <Auth />}
        />

        <Route
          path="/table"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProductsPage />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
