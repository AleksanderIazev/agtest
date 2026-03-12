import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../shared/lib/AuthContext';
import { Provider } from 'react-redux';
import { store } from './store/ConfigureStore';
import { AppLayout } from './AppLayout';

import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <AppLayout />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
