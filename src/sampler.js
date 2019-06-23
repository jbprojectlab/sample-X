import React, {useState, useEffect, Fragment} from 'react'
import 'p5/lib/addons/p5.sound'
import {AudioIn, SoundRecorder, SoundFile} from 'p5'
const mic = new AudioIn()
const recorder = new SoundRecorder()

const Sampler = ({pressedKey, keyVal}) => {
  const soundFile = new SoundFile()
  const [micState, setMicState] = useState(0)
  const [sample, setSample] = useState(soundFile)

  const enableMic = () => {
    mic.start()
    recorder.setInput(mic)
  }

  const onKeyDown = () => {
    console.log(mic.getLevel())
    window.addEventListener('keydown', ({key}) => {
      if(key === keyVal) {
        if(micState === 0) {
          console.log('recording')
          recorder.record(sample)
          setMicState(1)
        } else if(micState === 1) {
          console.log('stopping')
          recorder.stop()
          setMicState(2)
        }
      } else if(key === keyVal.toUpperCase() && sample.buffer && !sample.isPlaying()) {
        sample.play()
        const emptySoundFile = new SoundFile()
        setSample(emptySoundFile)
        setMicState(0)
      }
    })
  }
  useEffect(enableMic)
  useEffect(onKeyDown)

  return (
    <Fragment>
      <div className='sampler w-150'>
        <h6 className='record-btn w-150'>Press {keyVal} to record sample</h6>
        <button className='play-btn w-150' onClick={() => sample.play()} >Click to play sample</button>
      </div>
    </Fragment>
  )
}


export default Sampler