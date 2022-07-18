import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function DeleteIngredient({ recipe, setRecipe, index }) {
  const handleDeleteIngredient = () => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe((recipe) => ({
      ...recipe,
      ingredients: newIngredients,
    }));
  };

  return (
    <button
      className="minus-button add-ingredients-button"
      type="button"
      onClick={() => handleDeleteIngredient(index)}
    >
      <FontAwesomeIcon icon={faMinusCircle} />
    </button>
  );
}

export default DeleteIngredient;
