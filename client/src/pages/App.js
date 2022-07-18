import "./App.scss";
import axios from "axios";
import RecipeBlock from "../components/recipeBlock/RecipeBlock";
import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import Navigation from "../components/navigation/Navigation";
import { faAdd, faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useOnClickOutside from "../hooks/onClickOutside";
import Form from "../components/form/Form";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const addBoxRef = useRef(null);
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    ingredients: [""],
    preparation: "",
    image: "",
    postedBy: "",
    postedAt: "",
  });
  useOnClickOutside(addBoxRef, () => setAddMode(false));

  // debugger;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let res;
    try {
      res = await axios.get(`http://localhost:5000/`);
    } catch (err) {
      console.error(err);
      return;
    }
    setRecipes(res.data.msg);
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

  const generateRecipeBlocks = () => {
    if (!recipes) return;
    return recipes.map((recipe) => {
      return (
        <RecipeBlock key={nanoid()} recipe={recipe} fetchData={fetchData} />
      );
    });
  };

  //
  // Add section logic
  //

  const handleClose = () => {
    setAddMode(false);
    resetRecipe();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddMode(false);
    try {
      await axios.post("http://localhost:5000", newRecipe);
    } catch (err) {
      resetRecipe();
      return;
    }
    resetRecipe();
    await fetchData();
  };

  // Handle changing input values

  const handleChange = (e) => {
    setNewRecipe((newRecipe) => ({
      ...newRecipe,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeRecipeIngredients = (e, index) => {
    const temp = [...newRecipe.ingredients];
    temp[index] = e.target.value;
    setNewRecipe((recipe) => ({
      ...recipe,
      ingredients: [...temp],
    }));
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
      {/* Add new recipe */}
      {addMode && (
        <div className="add-container">
          <div
            className="add-box animate__animated animate__bounceIn"
            ref={addBoxRef}
          >
            <h3>Add Recipe</h3>
            <Form
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleChangeRecipeIngredients={handleChangeRecipeIngredients}
              recipe={newRecipe}
              setRecipe={setNewRecipe}
            >
              <div className="add-button-container">
                <button
                  className="cta-button-add"
                  type="button"
                  onClick={handleClose}
                >
                  <FontAwesomeIcon icon={faClose} />
                </button>
                <button className="cta-button-add" type="submit">
                  <FontAwesomeIcon icon={faAdd} />
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
