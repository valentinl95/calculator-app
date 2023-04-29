const STATES = {
  IDLE: "IDLE",
  FIRST_NUM: "FIRST_NUM",
  SECOND_NUM: "SECOND_NUM",
  RESULT: "RESULT",
};

const OPERATIONS = {
  plus: (arg1, arg2) => arg1 + arg2,
  minus: (arg1, arg2) => arg1 - arg2,
  mul: (arg1, arg2) => arg1 * arg2,
  divide: (arg1, arg2) => arg1 / arg2,
};

class CalculatorFsm {
  constructor() {
    this.state = STATES.IDLE;
    this.operation = null;
    this.currentNumber = "";
    this.result = 0;
  }

  transition(action) {
    switch (this.state) {
      case STATES.IDLE:
        if (/\d/.test(action)) {
          this.currentNumber = action;
          this.state = STATES.FIRST_NUM;
        } else if (action === "reset") {
          this.reset();
        }
        break;

      case STATES.FIRST_NUM:
        if (/\d/.test(action)) {
          this.currentNumber += action;
        } else if (action in OPERATIONS) {
          this.operation = OPERATIONS[action];
          this.state = STATES.SECOND_NUM;
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

      case STATES.SECOND_NUM:
        if (/\d/.test(action)) {
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
        if (/\d/.test(action)) {
          this.currentNumber = action;
          this.state = STATES.FIRST_NUM;
        } else if (action in ["reset", "del"]) {
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
    return (this.states !== STATES.IDLE) ? this.currentNumber : this.result;
  }
};

export default CalculatorFsm;
