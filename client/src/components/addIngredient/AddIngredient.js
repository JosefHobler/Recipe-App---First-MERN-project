import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function AddIngredient({ recipe, setRecipe }) {
  const handleAddIngredient = () => {
    const recipeIngredients = [...recipe.ingredients];
    recipeIngredients.push("");
    setRecipe((recipe) => ({
      name: recipe.name,
      ingredients: recipeIngredients,
      preparation: recipe.preparation,
    }));
  };

  return (
    <button
      className="add-ingredients-button plus-button"
      type="button"
      onClick={handleAddIngredient}
    >
      <FontAwesomeIcon icon={faCirclePlus} />
    </button>
  );
}

export default AddIngredient;
