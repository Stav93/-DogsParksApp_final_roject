import React from 'react'
import classes from "./Input.module.css"

const Input = ({isValid, id, label, type, value, onChange, onBlur, placeholder}) => {

  return (
    <div className={`${classes.control} ${ isValid === false ? classes.invalid : ''}`}>
        <label htmlFor={id}>{label}</label>
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
        />
      </div>
  )
}

export default Input
