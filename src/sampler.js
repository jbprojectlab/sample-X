import React, {useState, useEffect, Fragment} from 'react'
import 'p5/lib/addons/p5.sound'
import {AudioIn, SoundRecorder, SoundFile, Delay, Reverb} from 'p5'
const mic = new AudioIn()
const recorder = new SoundRecorder()
const delay = new Delay()
const reverb = new Reverb()

const Sampler = ({keyVal, start, pressedKey}) => {
  let sample = new SoundFile()
  const upperCaseKeyVal = keyVal.toUpperCase()
  const [recorderState, setRecorderState] = useState('inactive')
  const [delayState, setDelayState] = useState('off')
  const [reverbState, setReverbState] = useState('off')

  const enableMic = () => {
    mic.start()
    recorder.setInput(mic)
    start(mic.input.context)
  }
  
  const recordSample = () => {
    window.addEventListener('keydown', ({key, repeat}) => {
      if(key === keyVal) {
        sample = sample.buffer ? new SoundFile() : sample
        sample.playMode('restart')
        if(repeat) {
          recorder.record(sample)
          setRecorderState('recording')
        }
      } else if(key === upperCaseKeyVal && sample.buffer && !sample.isPlaying()) {
        if(delayState === 'on') {
          delay.process(sample)
          sample.play()
        } else {
          sample.play()
        }
        if(reverbState === 'on') {
          reverb.process(sample)
          sample.play()
        } else {
          sample.play()
        }
        sample.play()
        setRecorderState('playing')
        setInterval(() => setRecorderState('inactive'), sample.buffer.duration * 1000 + 100)
      }
    })
    window.addEventListener('keyup', ({key}) => {
      if(key === keyVal) {
        recorder.stop()
        setRecorderState('inactive')
      }
    })
  }

  const toggleEffect = ({target}) => {
    const {name, state} = target
    switch (name) {
      case 'delay':
        let toggledDelayState = delayState === 'on' ? 'off' : 'on'
        setDelayState(toggledDelayState)
        break
      case 'reverb':
        let toggledReverbState = reverbState === 'on' ? 'off' : 'on'
        setReverbState(toggledReverbState)
        break
      default: break
    }
  }

  useEffect(enableMic)
  useEffect(recordSample)

  return (
    <Fragment>
      <div className='sampler w-150'>
        <h6 className='record w-150'>HOLD {upperCaseKeyVal} to RECORD</h6>
        <h6>PRESS SHIFT + {upperCaseKeyVal} to PLAY</h6>
        <div className={`interface w-150 ${recorderState}`}>
          <h2>{upperCaseKeyVal}</h2>
          <div className='effects-container'>
            <button className={delayState} name='delay' state={delayState} onClick={toggleEffect}>DELAY</button>
            <button className={reverbState} name='reverb' state={reverbState} onClick={toggleEffect}>REVERB</button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}


export default Sampler