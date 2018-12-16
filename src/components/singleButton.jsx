import React from "react";

export const SingleButton = props => {
  return (
    <button
      onClick={props.clickButton}
      data-value={props.buttonValue}
      className="single-button"
    >
      {props.buttonValue}
    </button>
  );
};
