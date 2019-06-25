import React, {useState, useEffect, Fragment} from 'react'
import 'p5/lib/addons/p5.sound'
import {AudioIn, SoundRecorder, SoundFile} from 'p5'
const mic = new AudioIn()
const recorder = new SoundRecorder()

const Sampler = ({keyVal, start, pressedKey}) => {
  const sample = new SoundFile()
  const upperCaseKeyVal = keyVal.toUpperCase()

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
      } else if(key === upperCaseKeyVal && sample.buffer && !sample.isPlaying()) {
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
        <h6 className='record w-150'>HOLD {upperCaseKeyVal} to RECORD</h6>
        <h6>PRESS  + {upperCaseKeyVal} to PLAY</h6>
        <div className='oscilloscope w-150'>{upperCaseKeyVal}</div>
      </div>
    </Fragment>
  )
}


export default Sampler