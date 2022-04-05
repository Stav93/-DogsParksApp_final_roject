import React from 'react'
import Card from "../UI/Card/Card"
import classes from "./Dog.module.css"

function Dog({_id, name, year_of_birth, weight, likes, dislike}) {
  return (
    <div className={classes.container}>
      <Card>
        <label>{name}</label>
        <h3>year of birth: {year_of_birth}</h3>
      </Card>
    </div>
  )
}

export default Dog