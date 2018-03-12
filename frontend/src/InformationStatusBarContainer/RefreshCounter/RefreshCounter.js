import React from "react";
import "./RefreshCounter.css";

class RefreshCounter extends React.Component {
  constructor(props) {
    super(props);
    if (!this.isValidRefreshValue(props.refreshIntervalSeconds)) {
      throw new Error(
        "Refresh interval cannot be less than or equal to 0 and must be a number"
      );
    }

    this.state = {
      timeRemainingDisplay: this.formatTime(props.refreshIntervalSeconds),
      timeRemaining: props.refreshIntervalSeconds
    };
  }

  isValidRefreshValue(value) {
    return value && Number.isInteger(value);
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    const currentTimeRemaingMinusOne = this.state.timeRemaining - 1;
    const timeRemaining =
      currentTimeRemaingMinusOne < 0
        ? this.props.refreshIntervalSeconds
        : currentTimeRemaingMinusOne;

    if (currentTimeRemaingMinusOne <= 0) {
      if (this.props.refreshCallback) {
        this.props.refreshCallback();
      }
    }

    this.setState({
      timeRemainingDisplay: this.formatTime(timeRemaining),
      timeRemaining: timeRemaining
    });
  }

  formatTime(time) {
    const hours = time / 3600;
    const minutes = (time % 3600) / 60;
    const seconds = time % 60;

    const paddedHours = Math.trunc(hours)
      .toString()
      .padStart(2, "0");

    const paddedMinutes = Math.trunc(minutes)
      .toString()
      .padStart(2, "0");

    const paddedSeconds = Math.trunc(seconds)
      .toString()
      .padStart(2, "0");

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  }

  render() {
    return (
      <div className="refresh_timer">{this.state.timeRemainingDisplay}</div>
    );
  }
}

export default RefreshCounter;
