import React from 'react';
import './App.css';

import AppHeader from './components/AppHeader/AppHeader'
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients'
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor'

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className='container'>
        <BurgerIngredients />
        <BurgerConstructor/>
      </main>
    </div>
  );
}

export default App;
