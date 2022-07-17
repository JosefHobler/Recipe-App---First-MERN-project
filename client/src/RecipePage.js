import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./recipePage.scss";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faEdit,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
function RecipePage() {
  const id = window.location.pathname.substring(1);
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [""],
    preparation: "",
    image: "",
  });
  const fetchData = async () => {
    const res = await axios.get(`http://localhost:5000/${id}`);
    setRecipe(res.data.msg);
  };

  const displayIngredients = () => {
    if (!recipe.ingredients) return;

    return recipe.ingredients.map((ingredient) => (
      <li key={nanoid()}>{ingredient}</li>
    ));
  };
  console.log(id);
  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/${id}`);
    navigate("/");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="center-container">
        <div className="card">
          <div>
            <img src={recipe.image} alt={recipe.name} />
          </div>
          <h2>{recipe.name}</h2>
          <h4>Ingredients</h4>
          <ul className="ingredients">{displayIngredients()}</ul>
          <h4>Preparation</h4>
          <div className="preparation">
            <p>{recipe.preparation}</p>
          </div>
          <Link className="cta-button-add position-button" to="/">
            <FontAwesomeIcon icon={faBackward} />
          </Link>
          <Link className="cta-button-add position-button" to={`/edit/${id}`}>
            <FontAwesomeIcon icon={faEdit} />
          </Link>
          <button
            className="cta-button-add position-button"
            onClick={handleDelete}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipePage;
