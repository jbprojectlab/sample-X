import React, {useState, useEffect, Fragment} from 'react'
import 'p5/lib/addons/p5.sound'
import {AudioIn, SoundRecorder, SoundFile} from 'p5'
const mic = new AudioIn()
const recorder = new SoundRecorder()

const Sampler = ({keyVal, start, pressedKey}) => {
  const sample = new SoundFile()

  const enableMic = () => {
    mic.start()
    recorder.setInput(mic)
    start(mic.input.context)
  }

  const recordSample = () => {
    window.addEventListener('keydown', ({key, repeat}) => {
      if(key === keyVal && repeat) {
        console.log('repeating & recording')
        recorder.record(sample)
      } else if(key === keyVal.toUpperCase() && sample.buffer && !sample.isPlaying()) {
        sample.play()
      }
    })
    window.addEventListener('keyup', ({key}) => key === keyVal && recorder.stop())
  }

  useEffect(enableMic)
  useEffect(recordSample)

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