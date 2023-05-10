import { useState } from "react";
import axios from "axios";
import { Container, Grid, Col, Paper, Text, Center, Space, Card, Avatar, TextInput, Flex, Button } from '@mantine/core';
import RecipeDetails from "./RecipeDetails";
import styles from '../styles/Home.module.css';
import Link from 'next/link';



function SearchBar({ setIsSearchComplete }) {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);



  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/recipes?ingredients=${ingredients}`);
      setRecipes(response.data.recipes);
      setIsSearchComplete(true);
    } catch (error) {
      console.error(error);
    }
  };

  const searchedIngredients = ingredients.split(',').map(ingredient => ingredient.trim().toLowerCase());

  return (
    <Container>
      <Grid gutter="md">
        <Col span={12} style={{ textAlign: "center" }}>
          <form onSubmit={handleSubmit}>
            <Flex gap="md" justify="center">
            <TextInput
              type="text"
              placeholder="Enter ingredients (comma separated)"
              value={ingredients}
              onChange={(event) => setIngredients(event.target.value)}
            />
            <Button type="submit" color="orange">Search</Button>
            </Flex>
          </form>
        </Col>
      </Grid>
      <Grid gutter="md">
        <Col span={12}>
          {(recipes) &&
            recipes.map((recipe) => {
              console.log(recipe)
              return (
                <Link key={recipe.id} href={`/recipe/${recipe.id}`} passHref target="_blank"> 
                  <Card key={recipe.id} className={styles.recipeCard} onClick={() => setSelectedRecipeId(recipe.id)}>
                    <Paper padding="md" className={styles.recipePaper}>
                      <Grid>
                        <Col span={3}>
                          <Avatar src={recipe.image} size="xl" radius="xl" />
                        </Col>
                        <Col span={9}>
                          <Text size="lg" weight={500} c="#2E2B22">{recipe.title}</Text>
                          <Space h="xs" />
                          
                          <Text size="sm" color="dimmed">Click for recipe</Text>
                        </Col>
                      </Grid>
                    </Paper>
                  </Card>
                </Link>
              );
            })}
        </Col>
      </Grid>
    </Container>
  );
}

export default SearchBar;
