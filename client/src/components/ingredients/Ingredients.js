import React from "react";
import AddIngredient from "../addIngredient/AddIngredient";
import CustomInputField from "../customInputField/CustomInputField";
import DeleteIngredient from "../deleteIngredient/DeleteIngredient";
import "./ingredients.scss";

function Ingredients({ recipe, setRecipe, handleChangeRecipeIngredients }) {
  return (
    <>
      <div className="overflow-container">
        {recipe.ingredients.map((ingredient, index) => (
          <div>
            <span className="ingredients-container">
              <CustomInputField
                placeholder="Ingredient (required)"
                value={ingredient}
                onChange={(e) => handleChangeRecipeIngredients(e, index)}
              />
              <DeleteIngredient
                recipe={recipe}
                setRecipe={setRecipe}
                index={index}
              />
            </span>
          </div>
        ))}
      </div>
      <div>
        <AddIngredient recipe={recipe} setRecipe={setRecipe} />
      </div>
    </>
  );
}

export default Ingredients;
