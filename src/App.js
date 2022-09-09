
import './App.css';
import { useState } from 'react';
import Board from './components/Board';
import Game from './components/Game'

function App() {
  const [value, setValue] = useState(4)

  const onChange = (evt) => {
    setValue(+evt.target.value)
  }

  return (
  
    <div className="container">
      <Board value={value} onChange={onChange}/>
      {value ? <Game count={value}/> : null}
      </div>

  )

}

export default App;
