import React, {Component, Fragment} from 'react'
import 'p5/lib/addons/p5.sound'
import {AudioIn, SoundRecorder, SoundFile} from 'p5'

const mic = new AudioIn()
const recorder = new SoundRecorder()

class Sampler extends Component {
  state = {
    micState: 0,
    sample: new SoundFile()
  }

  componentDidMount() {
    mic.start()
    recorder.setInput(mic)
  }

  // componentDidUpdate(prevProps) {
  //   const {micState} = this.state
  //   const {pressedKey, keyVal} = this.props
  //   const {recordSample, playSample} = this
  //   if(this.props !== prevProps && pressedKey === keyVal) {
  //     if(micState === 1) playSample()
  //     else recordSample()
  //   }
  // }

  recordSample = evt => {
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
    const {micState} = this.state
    const {pressedKey, keyVal} = this.props
    const {recordSample, playSample} = this
    return (
      <Fragment>
        <div className='sampler w-150'>
          <button className='record-btn w-150' onClick={recordSample}>Click to record sample</button>
          <button className='play-btn w-150' onClick={playSample}>Click to play sample</button>
        </div>
      </Fragment>
    )
  }
}


export default Sampler