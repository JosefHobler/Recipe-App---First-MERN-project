import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./recipeBlock.scss";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleDown,
  faEdit,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

function RecipeBlock({ recipe, fetchData }) {
  console.log(recipe);
  const { ingredients, name, image, postedBy, postedAt, _id } = recipe;
  const handleDelete = async () => {
    console.log(_id);
    await axios.delete(`http://localhost:5000/${_id}`);
    await fetchData();
  };

  return (
    <div className="recipe-container">
      <h3 className="recipe-header">{name}</h3>
      <div className="recipe-divider">
        <div className="recipe-img-container">
          <img src={image} alt={name} className="recipe-img" />
        </div>
        <div>
          <p style={{ textAlign: "center" }}>Ingredients</p>
          <ul className="recipe-ingredients">
            {ingredients.map((ingredient) => (
              <li>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="posted-container">
        <div className="posted">
          <span>Author: </span>
          {postedBy}
        </div>
        <div className="posted">
          <span>At: </span> {postedAt}
        </div>
      </div>
      <div className="recipe-icons">
        <Link to={`/${_id}`} className="button-global">
          <FontAwesomeIcon icon={faAngleDoubleDown} />
        </Link>
        <div>
          <Link to={`/edit/${_id}`} className="button-global">
            <FontAwesomeIcon icon={faEdit} />
          </Link>
          <button onClick={handleDelete} className="button-global">
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeBlock;
