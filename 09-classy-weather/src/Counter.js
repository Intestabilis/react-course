import React from "react";

// Hooks can't be used in class components
class Counter extends React.Component {
  // state initializes in constructor
  constructor(props) {
    super(props);

    // defining a state property, object when each state property is a property
    this.state = { count: 5 };
    /* all handlers in jsx lose their binding to this keyword (because of how JS works) */
    // so we're binding methods in the constructor
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleDecrement() {
    console.log(this);
    // updating the state, working similar to useState setter
    this.setState((curState) => {
      return { count: curState.count - 1 };
    });

    // we also can do this too
    // this.setState({ count: 10 });
  }

  handleIncrement() {
    console.log(this);
    this.setState((curState) => {
      return { count: curState.count + 1 };
    });
  }

  render() {
    const date = new Date("june 21 2077");
    date.setDate(date.getDate() + this.state.count);

    return (
      <div>
        <button onClick={this.handleDecrement}>-</button>
        {/* accessing state variable (same with props: this.props.*) */}
        <span>
          {date.toDateString()} {this.state.count}
        </span>
        <button onClick={this.handleIncrement}>+</button>
      </div>
    );
  }
}

export default Counter;
