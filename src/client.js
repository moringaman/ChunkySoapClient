import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { ScrollToTop } from '../src/components';
import { hydrate } from 'react-dom';

hydrate(
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
