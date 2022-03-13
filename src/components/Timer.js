import React, { Component } from 'react';

const ONE_SECOND = 1000;
const TIME_LIMIT = 0;
const TIME_START = 30;

export default class Timer extends Component {
    state = {
      seconds: TIME_START,
    };

    componentDidMount() {
      this.countdown();
    }

    // if reaches 0, stop timer.
    componentDidUpdate() {
      const { seconds } = this.state;
      if (seconds === TIME_LIMIT) {
        this.stop();
      }
    }

    // function to start countdown timer
    countdown = () => {
      this.timerId = setInterval(() => {
        this.setState((prevState) => ({
          seconds: prevState.seconds - 1,
        }));
      }, ONE_SECOND);
    }

    // function to re-start timer in next question
    next = () => {
      this.setState({
        seconds: TIME_START,
      });
    }

    // function to stop countdown (implement setLocalStorage at the same time)
    stop = () => {
      clearInterval(this.timerId);
      const { seconds } = this.state;
      console.log(seconds);
    }

    render() {
      const { seconds } = this.state;
      return (
        <div>
          <section>
            {seconds}
          </section>
          {/* already implemented componentDidMount ok */}
          <button type="button" onClick={ this.countdown }>Start</button> 
          <button type="button" onClick={ this.next }>Reset</button>
          <button type="button" onClick={ this.stop }>Stop</button>
        </div>
      );
    }
}
