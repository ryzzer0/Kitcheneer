import axios from "axios";
import { useState, useEffect } from "react";

function RecipeDetails({ id }) {
  console.log("RecipeDetails rendered with id", id)
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    console.log(id);
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/recipes/${id}`);
        setRecipe(response.data.recipe);
      } catch (error) {
        console.error(error);
      }
    };
    if (id) {
      fetchRecipe();
    }
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <h2>Ingredients</h2>
      <ul>
        {recipe.extendedIngredients && recipe.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.originalString}</li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <ol>
        {recipe.analyzedInstructions?.[0]?.steps?.map((step) => (
          <li key={step.number}>{step.step}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeDetails;