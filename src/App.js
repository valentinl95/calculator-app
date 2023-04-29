import { useState } from 'react';
import './app.scss';
import CalculatorFsm from './calculatorFsm.js';
import Display from './display.js';
import Keyboard from './keyboard.js';
// import MultiStateLinearSwitch from './multiStateLinearSwitch.js';

function App() {
  const [fsm, setFsm] = useState(new CalculatorFsm());

  const onClick = (event) => {
    let newFsm = new CalculatorFsm(fsm);
    newFsm.transition(event.target.dataset.value);
    setFsm(fsm => ({ ...fsm, newFsm }));
  };

  console.log(fsm);
  return (
    <div className="app">
      <div className="container">
        <Display value={fsm.displayValue()} />
        <Keyboard clickHandler={onClick} />
      </div>
    </div>
  );
}

export default App;
