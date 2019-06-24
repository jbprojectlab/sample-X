import React, {useState, useEffect, Fragment} from 'react'
import Sampler from './sampler'
import Keyboard from './keyboard'
import './css/app.css'

const keyVals = ['r', 't', 'y', 'u', 'f', 'g', 'h', 'j']

const App = () => {
  const [pressedKey, setPressedKey] = useState('')

  const startSamplers = context => {
    if(context.state === 'suspended') context.resume()
  }

  const handleKeyPress = ({key}) => {
    setPressedKey(key)
  }

  const row1 = keyVals.slice(0, 4)
  const row2 = keyVals.slice(4)
  return (
    <div tabIndex='0' onKeyDown={handleKeyPress}>
      <div className='row'>
        {row1.map(keyVal => <Sampler
          keyVal={keyVal}
          start={startSamplers}
          pressedKey={pressedKey}
        />)}
      </div>
      <div className='row'>
        {row2.map(keyVal => <Sampler
          keyVal={keyVal}
          start={startSamplers}
          pressedKey={pressedKey}
        />)}
      </div>
      <Keyboard
        keyVals={keyVals}
        handleKeyPress={handleKeyPress}
      />
    </div>
  )
}

export default App