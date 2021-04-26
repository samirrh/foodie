import React from "react";
import { v4 as uuidv4 } from "uuid";

const Ingredients = ({ info }) => {
  return info.map(ingredient => {
    return (
      <ul key={uuidv4()}>
        <li>{ingredient.text} <br></br>Weight: {Number(ingredient.weight).toFixed(1)} g</li>
      </ul>
    );
  });
};

export default Ingredients;