const STATES = {
  IDLE: "IDLE",
  FIRST_NUM: "FIRST_NUM",
  SECOND_NUM_EMPTY: "SECOND_NUM_EMPTY",
  SECOND_NUM: "SECOND_NUM",
  RESULT: "RESULT",
};

const OPERATIONS = {
  plus: (arg1, arg2) => arg1 + arg2,
  minus: (arg1, arg2) => arg1 - arg2,
  mul: (arg1, arg2) => arg1 * arg2,
  divide: (arg1, arg2) => arg1 / arg2,
};

const digitsOrDotRegex = /\d|\./;

class CalculatorFsm {
  constructor() {
    this.state = STATES.IDLE;
    this.operation = null;
    this.currentNumber = "";
    this.result = 0;
  }

  clone() {
    const clonedObject = new CalculatorFsm();
    clonedObject.state = this.state;
    clonedObject.operation = this.operation;
    clonedObject.currentNumber = this.currentNumber;
    clonedObject.result = this.result;
    return clonedObject;
  }

  transition(action) {
    switch (this.state) {
      case STATES.IDLE:
        if (digitsOrDotRegex.test(action)) {
          this.currentNumber = (action === "." ? "0." : action);
          this.state = STATES.FIRST_NUM;
        } else if (action === "reset") {
          this.reset();
        }
        break;

      case STATES.FIRST_NUM:
        if (digitsOrDotRegex.test(action)) {
          this.currentNumber += action;
        } else if (action in OPERATIONS) {
          this.operation = OPERATIONS[action];
          this.state = STATES.SECOND_NUM_EMPTY;
          this.result = Number(this.currentNumber);
          this.currentNumber = "";
        } else if (action === "eq") {
          this.result = Number(this.currentNumber);
          this.currentNumber = "";
          this.state = STATES.RESULT;
        } else if (action === "del") {
          this.currentNumber = this.currentNumber.slice(0, -1);
        } else if (action === "reset") {
          this.reset();
        }
        break;

      case STATES.SECOND_NUM_EMPTY:
        if (digitsOrDotRegex.test(action)) {
          this.currentNumber = action;
          this.state = STATES.SECOND_NUM;
        } else if (action === "reset") {
          this.reset();
        }
        break;

      case STATES.SECOND_NUM:
        if (digitsOrDotRegex.test(action)) {
          this.currentNumber += action;
        } else if (action === "eq") {
          this.result = this.operation(this.result, Number(this.currentNumber));
          this.currentNumber = "";
          this.operation = null;
          this.state = STATES.RESULT;
        } else if (action === "del") {
          this.currentNumber = this.currentNumber.slice(0, -1);
        } else if (action === "reset") {
          this.reset();
        }
        break;

      case STATES.RESULT:
        if (digitsOrDotRegex.test(action)) {
          this.currentNumber = action;
          this.state = STATES.FIRST_NUM;
        } else if (["reset", "del"].includes(action)) {
          this.reset();
        }
        break;

      default:
        throw new Error(`Internal calculator error: unknown state ${this.state}`);
    }
  }

  reset() {
    this.states = STATES.IDLE;
    this.currentNumber = "";
    this.result = 0;
    this.operation = "";
  }

  displayValue() {
    let value = "0";
    switch (this.state) {
      case STATES.FIRST_NUM:
      case STATES.SECOND_NUM:
        value = this.currentNumber;
        break;

      case STATES.RESULT:
      case STATES.SECOND_NUM_EMPTY:
        value = this.result.toString();
        break;

      default:
        break;
    }

    return value.startsWith(".") ? `0${value}` : value;
  }
};

export default CalculatorFsm;
