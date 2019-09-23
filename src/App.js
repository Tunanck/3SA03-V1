import React from 'react';
import Event from './Event';
import Check from './Check';
import Head from './Head'
import _ from 'lodash';
import pic from './pic.jpg'
import './App.css';

const message = 'HOSPITAL'
const prepareStateFromWord = (given_word) => {
  let word = given_word.toUpperCase()
  let chars = _.shuffle(Array.from(word))
  return {
    word,
    chars,
    counter: 1,
    guess: [],
    completed: false,
    check: 0
  }
}

class App extends React.Component {
  state = {
    show: false,
    give_up: false
  }

  state = prepareStateFromWord(message);
  click = (value) => {
    let guess = [...this.state.guess, value]
    this.setState({ guess })
    if (guess.length === this.state.chars.length) {
      if (guess.join('').toString() === this.state.word) {
        this.setState({ guess: [], completed: true })
      } else {
        this.setState({ guess: [], counter: this.state.counter + 1 })
      }
    }
  }

  show_name = () => {
    this.setState({
      show: !this.state.show
    })
    console.log(this.state.show) // check
  }
  reset = () => {
    this.setState({ completed: false, check: this.state.check + 1, guess: [], counter: this.state.counter + 1 })
  }
  give_ups = () => {
    this.setState({
      give_up: !this.state.give_up
    })
  }

  setCom = () => {
    this.setState({ completed: true, })
  }

  render() {
    let showwin = this.state.completed === false ? '' : <h3>Completed!!!!</h3>;
    let check = this.state.completed === false ? '' : '';
    let gameover = this.state.counter > 3 ? "Game Over" : "Counter : " + this.state.counter;

    return (
      <div className="css">
        <div>
          <Head />
        </div>
        <div className="first">
          <div className="second">
            <div className="bgpic"><img className="pic" src={pic}></img></div>
            <div>
              {
                Array.from(this.state.chars).map((x, y) => (
                  <Event
                    value={x}
                    key={y}
                    click={this.click}
                    check={this.state.check}
                    counter={this.state.counter}
                  />
                ))
              }

              <h3>You can play 3 Round</h3>
              {
                Array.from(this.state.guess).map((x, y) => (
                  <Event
                    value={x}
                    key={y}
                    click={this.click}
                  />
                ))
              }
              <div>

                <Check check_count={this.state.counter} />
              </div>
              <div className="re">
                {showwin}
                {check}

              </div>
            </div>
            <button onClick={this.reset}><h1> Play Again</h1></button>;
            <div className="center-box">
              <div className="center-text">
                <h1 className="text">3SA03 React Web Application </h1>
                <div className="click">
                  <div className="button-a">
                  </div>
                  <div className="box-myname">
                    <h3>{this.state.show === true ? '6035512079' : 'By Nichakan Jaisaksern'}</h3>
                    <h3>{this.state.show === true ? '6035512079' : '6035512079'}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    )
  }
}
export default App;