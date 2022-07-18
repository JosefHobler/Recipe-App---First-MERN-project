import React from "react";
import CustomInputField from "../customInputField/CustomInputField";
import Ingredients from "../ingredients/Ingredients";

function Form({
  handleSubmit,
  handleChange,
  handleChangeRecipeIngredients,
  recipe,
  setRecipe,
  children,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <CustomInputField
          onChange={handleChange}
          name="name"
          placeholder="Name (required)"
          value={recipe.name}
        />
      </div>
      <Ingredients
        recipe={recipe}
        setRecipe={setRecipe}
        handleChangeRecipeIngredients={handleChangeRecipeIngredients}
      />
      <div>
        <textarea
          className="custom-textarea"
          placeholder="Preparation (required)"
          onChange={handleChange}
          name="preparation"
          cols={40}
          rows={10}
          type="text"
          value={recipe.preparation}
          id="preparation"
        />
      </div>
      <div>
        <CustomInputField
          onChange={handleChange}
          name="image"
          value={recipe.image}
          placeholder="Image URL (required)"
        />
      </div>
      <div>
        <CustomInputField
          onChange={handleChange}
          name="postedBy"
          value={recipe.postedBy}
          placeholder="Author (not required)"
        />
      </div>
      {children}
    </form>
  );
}

export default Form;
