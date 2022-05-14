import React, {useState, useEffect} from 'react'
import Park from "../Park/Park"
import classes from "../ParksList/ParksList.module.css"
import { useLocation } from 'react-router-dom'

function ParksList() {
  const [parks, setParks] = useState([])
  const [selectedCity, setSelectedCity] = useState("All")
  const location = useLocation();

  useEffect(() => {
      fetch(`/api/parks`)
      .then(response => response.json())
      .then(data => setParks(data));
  }, []);

  // בהתאם לתנאי ולקונטקסט - יראה את כל הפארקים והדרופ דאון או רק את הפארקים של היוזר
  return (
      <div className={classes.container}>
     <h1>All Parks</h1>
     <div className={classes.dropdown}>
     <label htmlFor="cities">Choose a city:</label>
      <select name="cities" id="cities" onChange={(event) => { setSelectedCity(event.target.value)}}>
        <option value="All">All</option>
        <option value="תל-אביב">Tel-Aviv</option>
        <option value="רמת גן">Ramat-Gan</option>
        <option value="באר שבע">Beer-Sheva</option>
        <option value="חיפה">Haifa</option>
      </select>
     </div>
     <div className={classes.parks}>
       {console.log(selectedCity)}
      {selectedCity === "All" ? parks.map(park => {
        return (
          <Park key={park._id} {...park}/>
        );
      }) :
      parks.filter(park => park.city === selectedCity)
        .map(park => {
        return (
          <Park key={park._id} {...park}/>
        );
      })
      }
    </div>
    </div>
   
  )
}

export default ParksList