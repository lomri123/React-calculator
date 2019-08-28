import React, { Component } from "react";
import "./App.css";
import { SingleButton } from "./components/SingleButton";
import { Display } from "./components/Display";
import { ClearButton } from "./components/ClearButton";
import { SubmitButton } from "./components/SubmitButton";
import math from "mathjs";

class App extends Component {
  state = {
    buttons: [
      "7",
      "8",
      "9",
      "*",
      "4",
      "5",
      "6",
      "/",
      "1",
      "2",
      "3",
      "-",
      "0",
      "."
    ],
    display: "",
    calculation: "",
    submitStatus: false
  };

  handleClick = value => {
    let tmpCalc = this.state.calculation;
    if (this.state.submitStatus) {
      this.setState({ submitStatus: false });
      if (!isNaN(Number(value))) {
        tmpCalc = "";
      }
    }
    this.setState({
      calculation: tmpCalc + value,
      display: tmpCalc + value
    });
  };

  handleClear = () => {
    this.setState({ calculation: "", display: "" });
  };

  handleSubmit = () => {
    const evaluation = this.state.calculation;
    try {
      math.eval(evaluation);
      const score = math.eval(evaluation);
      this.setState({
        display: score,
        submitStatus: true,
        calculation: score
      });
    } catch {
      this.setState({
        display: "ERROR",
        calculation: ""
      });
    }
  };

  render() {
    return (
      <div className="main">
        <ClearButton clearButton={this.handleClear} />
        <Display showResult={this.state.display} />
        {this.state.buttons.map(button => (
          <SingleButton
            buttonValue={button}
            key={button}
            clickButton={() => this.handleClick(button)}
          />
        ))}
        <SubmitButton submitButton={this.handleSubmit} />
        <SingleButton
          buttonValue="+"
          key="+"
          clickButton={() => this.handleClick("+")}
        />
      </div>
    );
  }
}

export default App;
