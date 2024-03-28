import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainLayout from './components/mainLayout/MainLayout'
import { Provider } from './components/provider/Provider';

function App() {
  return (
    <Provider>
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
    </Provider>
  );
}

export default App