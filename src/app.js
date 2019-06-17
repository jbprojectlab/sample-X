import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom'
import Sampler from './sampler'
import Keyboard from './keyboard'
import './css/app.css'

const keyVals = ['r', 't', 'y', 'u', 'f', 'g', 'h', 'j']

class App extends Component {
  state = {
    pressedKey: ''
  }

  handleChange = input => {
    console.log("Input changed", input)
  }

  handleKeyPress = pressedKey => {
    console.log('pressedKey:  ', pressedKey)
    this.setState({pressedKey})
  }

  render() {
    const {handleChange, handleKeyPress} = this
    const {pressedKey} = this.state
    return (
      <Fragment>
        {keyVals.map(keyVal => <Sampler
          keyVal={keyVal}
          pressedKey={pressedKey}
          handleKeyPress={handleKeyPress}
        />)}
        <Keyboard
          keyVals={keyVals}
          handleChange={handleChange}
          handleKeyPress={handleKeyPress}
        />
      </Fragment>
    )
  }
}

export default App