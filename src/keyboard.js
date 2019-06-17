import React, {Fragment} from 'react'
import {default as SimpleKeyboard} from 'react-simple-keyboard'
import './css/keyboard.css'


const Keyboard = props => {
  const {handleChange, handleKeyPress} = props
  return (
    <Fragment>
      <SimpleKeyboard
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </Fragment>
  )
}


export default Keyboard