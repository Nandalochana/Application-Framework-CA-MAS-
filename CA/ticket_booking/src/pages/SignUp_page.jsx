import {useEffect, useState} from 'react'
import SignUp from '../components/SignUp';



function App() {
  useEffect(()=>{
  },[]) // run only one time

  return (
    <div className="App">
      <SignUp/>
    </div>
  );
}

export default App;
