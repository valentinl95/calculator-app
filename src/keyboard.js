function Key({ code, text, value, clickHandler }) {
  return (
    <div className={`key non-selectable ${code}`} data-value={value} onClick={clickHandler}>
      <label>{text}</label>
    </div>
  );
}

function Keyboard({ clickHandler }) {
  const keyRows = [
    [
      { code: "seven", text: "7", value: "7" },
      { code: "eight", text: "8", value: "8" },
      { code: "nine", text: "9", value: "9" },
      { code: "del", text: "del", value: "del" },
    ],
    [
      { code: "four", text: "4", value: "4" },
      { code: "five", text: "5", value: "5" },
      { code: "six", text: "6", value: "6" },
      { code: "plus", text: "+", value: "plus" },
    ],
    [
      { code: "one", text: "1", value: "1" },
      { code: "two", text: "2", value: "2" },
      { code: "three", text: "3", value: "3" },
      { code: "minus", text: "-", value: "minus" },
    ],
    [
      { code: "dot", text: ".", value: "." },
      { code: "zero", text: "0", value: "0" },
      { code: "divide", text: "/", value: "divide" },
      { code: "mul", text: "x", value: "mul" },
    ],
    [
      { code: "reset", text: "reset", value: "reset" },
      { code: "eq", text: "=", value: "eq" },
    ],
  ];

  return (
    <div className="keyboard">
      {keyRows.map((keyRow, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {keyRow.map((key, index) => (
            <Key
              key={index}
              code={key.code}
              text={key.text}
              value={key.value}
              clickHandler={clickHandler}
            />))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
