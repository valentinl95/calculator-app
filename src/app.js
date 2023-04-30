import { useEffect, useState } from 'react';
import './app.scss';
import Header from './header';
import CalculatorFsm from './calculatorFsm';
import Display from './display';
import Keyboard from './keyboard';

function useTransition(state, time) {
  const [last, setLast] = useState(state);
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    setTransition(true);

    const timeout = setTimeout(() => {
      setLast(state);
      setTransition(false);
    }, time);

    return () => {
      clearTimeout(timeout);
    }
  }, [state, time]);

  return transition || last !== state;
}

function App() {
  const states = ["1", "2", "3"];

  const [fsm, setFsm] = useState(new CalculatorFsm());
  const [theme, setTheme] = useState(states[0]);
  const themeTransition = useTransition(theme, 350);

  const onClick = (event) => {
    let newFsm = fsm.clone();
    newFsm.transition(event.currentTarget.dataset.value);
    setFsm(newFsm);
  };

  return (
    <div className={`app theme-${theme}` + (themeTransition ? " theme-changing" : "")}>
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
