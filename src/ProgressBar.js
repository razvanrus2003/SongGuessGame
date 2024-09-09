import React from "react";

const ProgressBar = (props) => {
    const {completed} = props;
  
    const fillerStyles = {
      width: `${completed}%`,
    }
  
    return (
      <div className ="progressBarContainer">
        <div style={fillerStyles} className="progressBarFiller">
        </div>
      </div>
    );
  };

export default ProgressBar;
