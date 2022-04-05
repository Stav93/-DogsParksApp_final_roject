import React from 'react'
import classes from './Button.module.css'

function Button({type, onClick, disableBtn, children, className}) {
  console.log(className)
  return (
    <button 
      className={`${classes.button} ${className}`} 
      type={type || "button"}
      onClick={onClick}
      disabled={disableBtn}>
      {children}
    </button>
  )
} 

export default Button