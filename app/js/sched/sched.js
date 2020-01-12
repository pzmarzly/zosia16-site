import React from 'react';
import ReactDOM from 'react-dom';
import Schedule from './Schedule';
import { ModalProvider, ModalRoot } from '../modals/modals';

ReactDOM.render(
  <ModalProvider>
    <ModalRoot/>
    <Schedule/>
  </ModalProvider>,
  document.getElementById('schedule-root'));

