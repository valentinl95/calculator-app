import { useState } from 'react';
import './app.scss';
import Header from './header';
import CalculatorFsm from './calculatorFsm';
import Display from './display';
import Keyboard from './keyboard';

function App() {
  const states = ["1", "2", "3"];

  const [fsm, setFsm] = useState(new CalculatorFsm());
  const [theme, setTheme] = useState(states[0]);

  const onClick = (event) => {
    let newFsm = fsm.clone();
    newFsm.transition(event.currentTarget.dataset.value);
    setFsm(newFsm);
  };

  return (
    <div className={`app theme-${theme}`}>
      <div className="container">
        <Header
          states={states}
          theme={theme}
          setTheme={setTheme}
        />
        <Display value={fsm.displayValue() || 0} />
        <Keyboard clickHandler={onClick} />
      </div>
    </div>
  );
}

export default App;
