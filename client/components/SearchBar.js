import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import RecipeDetails from "./RecipeDetails";



function SearchBar() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);



  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/recipes?ingredients=${ingredients}`);
      setRecipes(response.data.recipes);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter ingredients (comma separated)"
        value={ingredients}
        onChange={(event) => setIngredients(event.target.value)}
      />
      <button type="submit">Search</button>
      {recipes &&
        recipes.map((recipe) => (
          <div key={recipe.id}>
            <Link href={`/recipes/${recipe.id}`} onClick={() => setSelectedRecipeId(recipe.id)}>
                  {recipe.title}
            </Link>
          </div>
        ))}
    </form>
    {selectedRecipeId && <RecipeDetails id={selectedRecipeId} />}
     </>
  );
}

export default SearchBar;