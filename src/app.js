import React, {useState, useEffect, Fragment} from 'react'
import Sampler from './sampler'
import './css/app.css'

const App = () => {
  const rows = [['r', 't'], ['y', 'u'], ['f', 'g'], ['h', 'j']]
  const [pressedKey, setPressedKey] = useState('')

  const startSamplers = context => {
    if(context.state === 'suspended') context.resume()
  }


  return (
    <div>
      <div id='header-container'>
        <div id='header'>
          <h2 id='title'>sample-X</h2>
          <div id='instructions'>
            <h6 className='record w-150'>HOLD KEY to RECORD</h6>
            <h6>PRESS SHIFT + KEY to PLAY</h6>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='section'>
          <div className='container'>
            {rows[0].map(keyVal => <Sampler
              keyVal={keyVal}
              start={startSamplers}
            />)}
          </div>
          <div className='container'>
            {rows[1].map(keyVal => <Sampler
              keyVal={keyVal}
              start={startSamplers}
            />)}
          </div>
        </div>
      </div>
      <div className='bottom row'>
        <div className='section'>
          <div className='container'>
            {rows[2].map(keyVal => <Sampler
              keyVal={keyVal}
              start={startSamplers}
            />)}
          </div>
          <div className='container'>
            {rows[3].map(keyVal => <Sampler
              keyVal={keyVal}
              start={startSamplers}
            />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App