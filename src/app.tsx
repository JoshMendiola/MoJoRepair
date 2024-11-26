import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NavigationProvider } from './context/NavigationContext';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavigationProvider>
          <div className="app">
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