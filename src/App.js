import React from 'react';
import './App.css';

const numRegex = /[0-9]/


//Main UI component displaying calculator
class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: [],
      results: []
    }
    //Bind methods here
    this.handleClick = this.handleClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleEval  = this.handleEval.bind(this);
  }
  handleClear() {
    this.setState({
      message: [],
      results: [0]
    })
  }
  handleClick(event) {
    if (event.target.value == "backSpace") {
      this.setState({
          message: this.state.message.slice(0, -1)
      })
    }
    else if (this.state.message.includes(".") && event.target.value == ".") {
      //Do nothing when decimal is already present and next keyClick is decimal again
    }
    else if (!this.state.message.includes("=")){
      this.setState({
          message: this.state.message.concat(event.target.value),
        })
      console.log(typeof event.target.value)
    }
    else if (this.state.message.includes("=") && !numRegex.test(event.target.value)){
      this.setState({
          message: [this.state.results[this.state.results.length-1]].concat(event.target.value),
          results: []
      })
    }
    else {
      this.setState({
          message: [].concat(event.target.value),
          results: []
      })
    }
  }
  handleEval(event) {
    let sum = eval(this.state.message.join(""))
    
    this.setState({
      results: this.state.results.concat(sum),
      message: this.state.message.concat(event.target.value).concat(sum)
    })
  }
  render() {
    return (
      <div>
        <div className="calculator">
          <UpperScreen displayNumbers={this.state.message}/>
          <LowerScreen displayResults={this.state.results[this.state.results.length-1]}/>
          <Buttons 
            handleClick={this.handleClick} 
            handleClear={this.handleClear}
            handleEval ={this.handleEval}/>
        </div>
        <p>Coded by Codey Du! 2019 November 21st</p>
      </div>
    )
  }
}
//Component for buttons
class Buttons extends React.Component {
  render() {
    return(
      <div>
        <button className="wideButton" onClick={this.props.handleClear}>AC</button>
        <button value="/" onClick={this.props.handleClick}>/</button>
        <button value="*" onClick={this.props.handleClick}>x</button>
        <button value="7" onClick={this.props.handleClick}>7</button>
        <button value="8" onClick={this.props.handleClick}>8</button>
        <button value="9" onClick={this.props.handleClick}>9</button>
        <button value="-" onClick={this.props.handleClick}>-</button>
        <button value="4" onClick={this.props.handleClick}>4</button>
        <button value="5" onClick={this.props.handleClick}>5</button>
        <button value="6" onClick={this.props.handleClick}>6</button>
        <button value="+" onClick={this.props.handleClick}>+</button>
        <button value="1" onClick={this.props.handleClick}>1</button>
        <button value="2" onClick={this.props.handleClick}>2</button>
        <button value="3" onClick={this.props.handleClick}>3</button>
        <button value="backSpace" onClick={this.props.handleClick}>Back Space</button>
        <button className="wideButton" value="0" onClick={this.props.handleClick}>0</button>
        <button value="." onClick={this.props.handleClick}>.</button>
        <button value="=" onClick={this.props.handleEval}>=</button>
      </div>
    )
  }
}
//Component for upper screen displaying formula
class UpperScreen extends React.Component {
  render() {
    return(
      <div>
        <h1>{this.props.displayNumbers}</h1>
      </div>
    )
  }
}
//Component for lower screen displaying results
class LowerScreen extends React.Component {
  render() {
    return(
      <div>
        <h1>{this.props.displayResults}</h1>
      </div>
    )
  }
}

export default Calculator;
