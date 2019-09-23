import React from 'react';
import Event from './Event';
import Check from './Check';
import './App.css';
import Start from './Start'
import _ from 'lodash';
import profile from './profile.jpg'

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
    this.setState({ check: this.state.check + 1, completed: false })
  }
  give_ups = () => {
    this.setState({
      give_up: !this.state.give_up
    })
  }

  render() {
    let check = this.state.completed === false ? '' : <button onClick={this.reset}><h1> Play Again</h1></button>;
    let ans = this.state.completed === false ? '' : <h3>!!!!! </h3>;
    let checks = this.state.completed === false ? '' : <h1> WINNER </h1>;
    //let count_end = this.state.counter > 5 ? "Game Over" : "Counter : " + this.state.counter;

    return (
      <div className="css">
        <div>
          <Start />
        </div>
        <div className="first">
          <div className="second">
            <div className="activeCard"><img className="profile" src={profile}></img></div>
            <div>
              {
                Array.from(this.state.chars).map((x, y) => (
                  <Event
                    value={x}
                    key={y}
                    click={this.click}
                    number={this.state.counter}
                    check={this.state.check}
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
                <div className="itemm">
                  {check}
                  {ans}
                  {checks}
                </div>
              </div>
            <div className="center-box">
              <div className="center-text">
                <h1 className="text">3SA03 React Web Application </h1>
                <div className="click">
                  <div className="button-a">
                  </div>
                  <div className="box-myname">
                    <h3 className="jan">{this.state.show === true ? '6035512079' : 'By Nichakan Jaisaksern'}</h3>
                    <h3 className="jan">{this.state.show === true ? '6035512079' : '6035512079'}</h3>
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