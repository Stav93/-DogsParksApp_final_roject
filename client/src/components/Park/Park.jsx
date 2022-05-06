import { useState } from 'react'
import Card from "../UI/Card/Card"
import classes from "./Park.module.css"
import Modal from '../UI/Modal/Modal'
import Button from '../UI/Button/Button'

function Park({_id, name, city, street}) {

  return (
    <div className={classes.park} >
      <Card>
        <label>{name}</label>
        <h3>City: {city}</h3>
        <h3>street: {street}</h3>
      </Card>
    </div>
  )
}  

export default Park