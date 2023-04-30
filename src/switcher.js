function Switcher({ states, state, setState }) {
  const stateIndex = states.indexOf(state);

  function handleClick(index) {
    setState(states[index]);
  }

  return (
    <div className="switcher-container">
      <div className="switcher-labels">
        {states.map((stateName, index) => (<label key={index}>{stateName}</label>))}
      </div>
      <div className="switcher" style={{ "--total": states.length }}>
        {states.map((_, index) => (
          <div
            style={{ "--current": index }}
            key={index}
            className="circle"
            onClick={() => handleClick(index)}
          />
        ))}
        <div className="tumbler" style={{ "--current": stateIndex }} />
      </div>
    </div>
  );
}

export default Switcher;
