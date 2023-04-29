function MultiStateLinearSwitch({ states, currentState }) {
  const styles = {
    "--size": states.length,
    "--current": currentState,
  };

  return (
    <div className="switch-board" style={styles}>
      <div className="switch"></div>
    </div>
  );
}

export default MultiStateLinearSwitch;
