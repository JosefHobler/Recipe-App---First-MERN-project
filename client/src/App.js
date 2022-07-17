import "./App.scss";
import axios from "axios";
import RecipeBlock from "./components/RecipeBlock";
import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import Navigation from "./components/Navigation";
import {
  faAdd,
  faCirclePlus,
  faClose,
  faMinus,
  faMinusCircle,
  faMinusSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useOnClickOutside from "./hooks/onClickOutside";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const addBoxRef = useRef(null);
  useOnClickOutside(addBoxRef, () => setAddMode(false));
  // debugger;

  const [newRecipe, setNewRecipe] = useState({
    name: "",
    ingredients: [""],
    preparation: "",
    image: "",
    postedBy: "",
    postedAt: "",
  });
  console.log(newRecipe);
  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000");
    setRecipes(res.data.msg);
  };

  const displayIngredients = () => {
    return newRecipe.ingredients.map((ingredient, index) => (
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

  const resetRecipe = () => {
    setNewRecipe({
      name: "",
      ingredients: [""],
      preparation: "",
      image: "",
      postedBy: "",
      postedAt: "",
    });
  };

  const deleteIngredient = (index) => {
    const newIngredients = newRecipe.ingredients.filter((_, i) => i !== index);
    setNewRecipe((recipe) => ({
      ...recipe,
      ingredients: newIngredients,
    }));
  };

  const handleChange = (e) => {
    setNewRecipe((newRecipe) => ({
      ...newRecipe,
      [e.target.name]: e.target.value,
    }));
  };

  const changeRecipeIngredients = (e, index) => {
    const temp = [...newRecipe.ingredients];
    temp[index] = e.target.value;
    setNewRecipe((recipe) => ({
      ...recipe,
      ingredients: [...temp],
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const generateRecipeBlocks = () => {
    if (!recipes) return;
    return recipes.map((recipe) => {
      return (
        <RecipeBlock key={nanoid()} recipe={recipe} fetchData={fetchData} />
      );
    });
  };

  const handleAddIngredient = () => {
    const recipeIngredients = [...newRecipe.ingredients];
    recipeIngredients.push("");
    setNewRecipe((recipe) => ({
      name: recipe.name,
      ingredients: recipeIngredients,
      preparation: recipe.preparation,
    }));
  };

  const handleClose = () => {
    setAddMode(false);
    resetRecipe();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddMode(false);
    try {
      const res = await axios.post("http://localhost:5000", newRecipe);
    } catch (err) {
      resetRecipe();
      return;
    }
    resetRecipe();
    await fetchData();
  };

  return (
    <>
      <Navigation />
      <div className="container">
        <div className="recipe-wrapper">{generateRecipeBlocks()}</div>
      </div>
      <button className="cta-button-main" onClick={() => setAddMode(true)}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
      {addMode && (
        <div className="add-container">
          <div
            className="add-box animate__animated animate__bounceIn"
            ref={addBoxRef}
          >
            <h3>Add Recipe</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  className="custom-input"
                  placeholder="Name (required)"
                  onChange={handleChange}
                  name="name"
                  type="text"
                  id="name"
                />
              </div>
              <div>
                <span>{displayIngredients()}</span>
              </div>
              <button
                className="add-ingredients-button plus-button"
                type="button"
                onClick={handleAddIngredient}
              >
                <FontAwesomeIcon icon={faCirclePlus} />
              </button>
              <div>
                <div className="add-preparation"></div>
                <textarea
                  className="custom-textarea"
                  placeholder="Preparation (required)"
                  onChange={handleChange}
                  name="preparation"
                  cols={40}
                  rows={10}
                  type="text"
                  id="preparation"
                />
              </div>
              <div>
                <input
                  className="custom-input"
                  placeholder="Image URL (required)"
                  onChange={handleChange}
                  name="image"
                  type="text"
                  id="image"
                />
              </div>
              <div>
                <input
                  className="custom-input"
                  placeholder="Author (not required)"
                  onChange={handleChange}
                  name="postedBy"
                  type="text"
                  id="postedBy"
                />
              </div>
              <div className="add-button-container">
                <button
                  className="cta-button-add"
                  type="button"
                  onClick={handleClose}
                >
                  <FontAwesomeIcon icon={faClose} />
                </button>
                <button
                  className="cta-button-add"
                  type="submit"
                  onClick={handleSubmit}
                >
                  <FontAwesomeIcon icon={faAdd} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
