import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'
import Login from './component/Loginfield';



function App() {
  useEffect(()=>{
  },[]) // run only one time

  return (
    <div className="App">
      <Login/>
    </div>
  );
}

export default App;
