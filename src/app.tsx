import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NavigationProvider } from './context/NavigationContext';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <BrowserRouter>
      <AuthProvider>
        <NavigationProvider>
          {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
          <div className={`app ${loading ? 'hidden' : ''}`}>
            <Header />
            <main id="app">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </NavigationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;