import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { KanbanBoard } from './KanbanBoard';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { kanbanReducer } from './reducer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = createStore(kanbanReducer);

root.render(
  <Provider store={store}>
    <KanbanBoard />
  </Provider>
);
