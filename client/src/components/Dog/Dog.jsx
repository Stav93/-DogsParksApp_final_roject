import React from 'react'
import Card from "../UI/Card/Card"
import classes from "./Dog.module.css"

function Dog({_id, name, year_of_birth, weight, likes, dislike}) {
  return (
    <div className={classes.dog}>
      <Card>
        <label>{name}</label>
        <h3>year of birth: {year_of_birth}</h3>
        <h3>weight: {weight}</h3>
        <h3>likes: {likes}</h3>
        <h3>dislike: {dislike}</h3>
      </Card>
    </div>
  )
}  

export default Dog