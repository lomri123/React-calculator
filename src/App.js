import React, { Component } from "react";
import "./App.css";
import { SingleButton } from "./components/singleButton";
import { Display } from "./components/Display";
import { Clear } from "./components/Clear";
import { Submit } from "./components/Sumbit";
import math from "mathjs";

class App extends Component {
  state = {
    display: "",
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
    calculation: ""
  };

  handleClick = e => {
    const value = e.target.getAttribute("data-value");
    this.setState(prevState => ({
      calculation: prevState.calculation + value,
      display: prevState.display === "ERROR" ? value : prevState.display + value
    }));
  };

  handleClear = () => {
    this.setState({ calculation: "", display: "" });
  };

  handleSubmit = () => {
    let evaluation = this.state.calculation;

    try {
      math.eval(evaluation);
      let score = math.eval(evaluation);
      this.setState({
        display: score
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
        <Clear clearButton={this.handleClear} />
        <Display showResult={this.state.display} />
        {this.state.buttons.map(button => (
          <SingleButton
            buttonValue={button}
            key={button}
            clickButton={this.handleClick}
          />
        ))}
        <Submit submitButton={this.handleSubmit} />
        <SingleButton buttonValue="+" key="+" clickButton={this.handleClick} />
      </div>
    );
  }
}

export default App;
