/* eslint-disable prettier/prettier */
import 'react-image-lightbox/style.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-quill/dist/quill.snow.css';
import 'simplebar/src/simplebar.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import './locales/i18n';
import './utils/highlight';

import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { PersistGate } from 'redux-persist/lib/integration/react';


import App from './App';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';
import { AuthProvider } from './contexts/JWTContext';
import { persistor, store } from './store';

ReactDOM.render(
  <AuthProvider>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CollapseDrawerProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </CollapseDrawerProvider>
          </LocalizationProvider>
        </PersistGate>
      </ReduxProvider>
    </HelmetProvider>
  </AuthProvider>,
  document.getElementById('root'),
);
