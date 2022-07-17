import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./editPage.scss";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCirclePlus,
  faMinusCircle,
  faPlus,
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

  const changeRecipe = (e) => {
    setRecipe((recipe) => ({
      ...recipe,
      [e.target.name]: e.target.value,
    }));
  };

  const deleteIngredient = (index) => {
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

  const changeRecipeIngredients = (e, index) => {
    recipe.ingredients[index] = e.target.value;
    setRecipe((recipe) => ({
      ...recipe,
    }));
  };

  const fetchData = async () => {
    const res = await axios.get(`http://localhost:5000/${id}`);
    setRecipe(res.data.msg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.patch(`http://localhost:5000/${id}`, recipe);
    console.log(res);
  };

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
            onChange={(e) => changeRecipeIngredients(e, index)}
            value={ingredient}
          />
          <button
            className="minus add-ingredients-button"
            type="button"
            onClick={() => deleteIngredient(index)}
          >
            <FontAwesomeIcon icon={faMinusCircle} />
          </button>
        </span>
      </div>
    ));
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            id="name"
            onChange={changeRecipe}
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
            onChange={changeRecipe}
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
              onChange={changeRecipe}
              name="postedBy"
              type="text"
              placeholder="Author"
              value={recipe.postedBy}
              className="custom-input"
            />
          </div>
          <div>
            <input
              onChange={changeRecipe}
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
