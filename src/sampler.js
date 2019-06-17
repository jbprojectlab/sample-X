import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom'
import 'p5/lib/addons/p5.sound'
import {AudioIn, SoundRecorder, SoundFile} from 'p5'

const mic = new AudioIn()
const recorder = new SoundRecorder()
const sample = new SoundFile()

class Sampler extends Component {
  state = {
    micState: 0,
    sample
  }

  componentDidMount() {
    mic.start()
    recorder.setInput(mic)
  }

  assignSample = evt => {
    const {micState, sample} = this.state
    if(micState === 0 && mic.enabled) {
      recorder.record(sample)
    } else if(micState === 1) {
      recorder.stop()
    }
    const currentMicState = micState === 0 ? 1 : 0
    this.setState({micState: currentMicState, sample})   
  }

  playSample = evt => {
    const {sample} = this.state
    sample.play()
  }

  render() {
    const {assignSample, playSample} = this
    return (
      <Fragment>
        <button onClick={assignSample}>Click to assign sample</button>
        <button onClick={playSample}>Click to play sample</button>
      </Fragment>
    )
  }
}


export default Sampler