import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./editPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Form from "../components/form/Form";

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

  //

  return (
    <div className="center-container">
      <div className="card">
        <h1>Edit Recipe</h1>
        <Form
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleChangeRecipeIngredients={handleChangeRecipeIngredients}
          recipe={recipe}
          setRecipe={setRecipe}
        >
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
        </Form>
      </div>
    </div>
  );
}

export default EditPage;
