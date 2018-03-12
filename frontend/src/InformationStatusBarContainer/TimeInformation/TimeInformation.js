import React from "react";
import "./TimeInformation.css";

class TimeInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      currentTime: new Date()
    });
  }

  render() {
    return (
      <div className="current_time">
        {this.state.currentTime.toLocaleString("en-US", { hour12: false })}
      </div>
    );
  }
}

export default TimeInformation;
