import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./editPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCirclePlus,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";

function EditPage() {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [""],
    preparation: "",
    image: "",
    postedBy: "",
    postedAt: "",
  });

  const id = window.location.pathname.substring(6);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let res;
    try {
      res = await axios.get(`http://localhost:5000/${id}`);
    } catch (err) {
      console.error(err);
      return;
    }
    setRecipe(res.data.msg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.patch(`http://localhost:5000/${id}`, recipe);
  };

  // Handle changing input values

  const handleChange = (e) => {
    setRecipe((recipe) => ({
      ...recipe,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeRecipeIngredients = (e, index) => {
    recipe.ingredients[index] = e.target.value;
    setRecipe((recipe) => ({
      ...recipe,
    }));
  };

  // 2 Functions for buttons in section Ingredients

  const handleDeleteIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe((recipe) => ({
      ...recipe,
      ingredients: newIngredients,
    }));
  };

  const handleAddIngredient = () => {
    const recipeIngredients = [...recipe.ingredients];
    recipeIngredients.push("");
    setRecipe((recipe) => ({
      name: recipe.name,
      ingredients: recipeIngredients,
      preparation: recipe.preparation,
    }));
  };

  //

  const displayIngredients = () => {
    if (!recipe.ingredients) return;

    return recipe.ingredients.map((ingredient, index) => (
      <div>
        <span className="ingredients-container">
          <input
            className="custom-input"
            type="text"
            id="ingredients"
            placeholder="Ingredient (required)"
            onChange={(e) => handleChangeRecipeIngredients(e, index)}
            value={ingredient}
          />
          <button
            className="minus add-ingredients-button"
            type="button"
            onClick={() => handleDeleteIngredient(index)}
          >
            <FontAwesomeIcon icon={faMinusCircle} />
          </button>
        </span>
      </div>
    ));
  };

  return (
    <div className="center-container">
      <form onSubmit={handleSubmit}>
        <h1>Edit Recipe</h1>
        <div>
          <input
            placeholder="Name"
            className="custom-input"
            name="name"
            type="text"
            onChange={handleChange}
            value={recipe.name}
          />
        </div>
        <div className="edit-ingredients-container">{displayIngredients()}</div>
        <button
          type="button"
          className="add-ingredients-button plus-button"
          onClick={handleAddIngredient}
        >
          <FontAwesomeIcon icon={faCirclePlus} />
        </button>
        <div>
          <textarea
            placeholder="Preparation"
            className="custom-textarea edit-preparations-container"
            onChange={handleChange}
            name="preparation"
            cols={50}
            rows={10}
            type="text"
            value={recipe.preparation}
          />
        </div>
        <div className="edit-splitter">
          <div>
            <input
              onChange={handleChange}
              name="postedBy"
              type="text"
              placeholder="Author"
              value={recipe.postedBy}
              className="custom-input"
            />
          </div>
          <div>
            <input
              onChange={handleChange}
              name="image"
              type="text"
              placeholder="Image URL"
              value={recipe.image}
              className="custom-input"
            />
          </div>
        </div>
        <div>
          <button type="submit" className="button-save-changes">
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>
        <div>
          <Link className="button-navigate" to={`/`}>
            Navigate back
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditPage;
