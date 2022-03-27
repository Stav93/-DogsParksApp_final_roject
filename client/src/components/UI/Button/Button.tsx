import React from 'react'
import classes from './Button.module.css'

function Button({type, onClick, disableBtn, children}) {
  return (
    <button 
      className={classes.button} 
      type={type || "button"}
      onClick={onClick}
      disabled={disableBtn}>
      {children}
    </button>
  )
} 

export default Button