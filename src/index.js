import React from 'react';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
//import store from './redux/store';
import { Provider } from 'react-redux';
import store from "./store"
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import { disableReactDevTools } from '@fvilers/disable-react-devtools';

// Disable React DevTools only in production
if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}




const container = document.getElementById('root');
const root = createRoot(container);

let persistor = persistStore(store)


//store.dispatch(productFetch()


root.render(
  <React.StrictMode>

    <Provider store={store}>
   
    <PersistGate loading={null} persistor={persistor}>

    <App />
    </PersistGate>

   
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();














/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >   
  
    <App/>
   
    </Provider>
  </React.StrictMode>
   
);*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();







