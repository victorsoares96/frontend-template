import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import 'react-image-lightbox/style.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-quill/dist/quill.snow.css';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import 'mapbox-gl/dist/mapbox-gl.css';
import { PersistGate } from 'redux-persist/lib/integration/react';
import 'simplebar/src/simplebar.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import App from './App';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';
import { AuthProvider } from './contexts/JWTContext';
import { SettingsProvider } from './contexts/SettingsContext';
import './locales/i18n';
import { persistor, store } from './store';
import './utils/highlight';

ReactDOM.render(
  <AuthProvider>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <SettingsProvider>
              <CollapseDrawerProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </CollapseDrawerProvider>
            </SettingsProvider>
          </LocalizationProvider>
        </PersistGate>
      </ReduxProvider>
    </HelmetProvider>
  </AuthProvider>,
  document.getElementById('root'),
);
