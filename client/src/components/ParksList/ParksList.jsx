import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchParks } from "../../store/parks-slice";
import Park from "../Park/Park";
import classes from "../ParksList/ParksList.module.css";

function ParksList() {
  const [selectedCity, setSelectedCity] = useState("All");

  const parks = useSelector((state) => state.parks.parks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchParks());
  }, []);

  const filterByCity = ({ city }) => {
    if (selectedCity === "All") {
      return true;
    }
    return city === selectedCity;
  };

  return (
    <div className={classes.container}>
      <h1>All Parks</h1>
      <div className={classes.dropdown}>
        <label htmlFor="cities">Choose a city:</label>
        <select
          name="cities"
          id="cities"
          onChange={(event) => {
            setSelectedCity(event.target.value);
          }}
        >
          <option value="All">All</option>
          <option value="תל-אביב">Tel-Aviv</option>
          <option value="רמת גן">Ramat-Gan</option>
          <option value="באר שבע">Beer-Sheva</option>
          <option value="חיפה">Haifa</option>
        </select>
      </div>
      <div className={classes.parks}>
        {parks.filter(filterByCity).map((park, index) => {
          return (
            <Park key={park._id} index={index} {...park} />
          );
        })}
      </div>
    </div>
  );
}

export default ParksList;
