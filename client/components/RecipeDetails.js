import axios from "axios";
import { useState, useEffect } from "react";
import {
  Grid,
  Col,
  Badge,
  Text,
  Flex,
  Space,
  Divider,
  Button,
  Card,
  Center,
  List,
} from "@mantine/core";
import styles from "../styles/Recipe.module.css";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";
import { MdPrint } from "react-icons/md";

function RecipeDetails({ id }) {
  console.log("RecipeDetails rendered with id", id);
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    console.log(id);
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/recipes/${id}`);
        console.log(response.data.recipe);
        setRecipe(response.data.recipe.recipe);
      } catch (error) {
        console.error(error);
      }
    };
    if (id) {
      fetchRecipe();
    }
  }, [id]);
  const isSmallScreen = useMediaQuery("(max-width: 960px)");

  const printCard = (cardContent) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Print</title></head><body>");
    printWindow.document.write(
      '<link rel="stylesheet" href="/path/to/your/css/styles.css" type="text/css" />'
    );
    printWindow.document.write(cardContent);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  const handlePrint = () => {
    const card = document.getElementById("recipeCard");
    const cardContent = card.outerHTML;
    printCard(cardContent);
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const firstSentence = recipe.summary
  .split(".")[0]
  .replace(/<b>/g, "")
  .replace(/<\/b>/g, "") + ".";

  return (
    <div className={styles.recipeDetails}>
      <Grid gutter="xl">
        {isSmallScreen ? (
          <>
            <Col span={12}>
              <img
                className={styles.recipeImage}
                src={recipe.image}
                alt={recipe.title}
              />
            </Col>
            <Col span={12}>
              <div className={styles.centeredContent}>
                <Flex gap="xl" justify="center">
                  <Text className={styles.foodista}>Brought to you by:</Text>
                  <Link href="https://www.foodista.com" target="_blank">
                    <img src="/foodista.png" alt="foodista" width="50%" />
                  </Link>
                </Flex>
                <h1 className={styles.recipeTitle}>{recipe.title}</h1>
                <p className={styles.recipeSummary}>{firstSentence}</p>
                <Space h="md" />
                <div className={styles.badgeContainer}>
                  {recipe.dishTypes.map((dishType, index) => (
                    <Badge
                      color="orange"
                      variant="filled"
                      radius="sm"
                      key={index}
                      className={styles.dishTypeBadge}
                    >
                      {dishType}
                    </Badge>
                  ))}
                </div>
              </div>
            </Col>
          </>
        ) : (
          <>
            <Col span={6}>
              <div className={styles.centeredContent}>
                <Flex gap="xl" justify="center">
                  <Text className={styles.foodista}>Brought to you by:</Text>
                  <Link href="https://www.foodista.com" target="_blank">
                    <img src="/foodista.png" alt="foodista" width="50%" />
                  </Link>
                </Flex>
                <h1 className={styles.recipeTitle}>{recipe.title}</h1>
                <p className={styles.recipeSummary}>{firstSentence}</p>
                <Space h="md" />
                <div className={styles.badgeContainer}>
                  {recipe.dishTypes.map((dishType, index) => (
                    <Badge
                      color="orange"
                      variant="filled"
                      radius="sm"
                      key={index}
                      className={styles.dishTypeBadge}
                    >
                      {dishType}
                    </Badge>
                  ))}
                </div>
              </div>
            </Col>
            <Col span={6}>
              <img
                className={styles.recipeImage}
                src={recipe.image}
                alt={recipe.title}
              />
            </Col>
          </>
        )}
        <Divider size="sm" style={{ width: "100%" }} />
      </Grid>
      <Grid gutter="md">
        <Col span={12}>
          <Card id="recipeCard" className={styles.recipeCard}>
            <Grid>
              <Col span={6}>
                <Text align="left" weight={400} size="lg">
                  Recipe
                </Text>
              </Col>
              <Col span={6} style={{ textAlign: "right" }}>
                <Button
                  color="orange"
                  onClick={handlePrint}
                  leftIcon={<MdPrint />}
                >
                  Print
                </Button>
              </Col>
            </Grid>
            <Space h="xl" />
            <Text align="center" weight={700} size="30px">
              {recipe.title}
            </Text>
            <Space h="xl" />
            <Grid>
              <Col span={6}>
                <Text align="center" weight="500">
                  <Text span c="orange" inherit>
                    Total Time:
                  </Text>{" "}
                  {recipe.readyInMinutes} minutes
                </Text>
              </Col>
              <Col span={6}>
                <Text align="center" weight="500">
                  <Text span c="orange" inherit>
                    Servings:
                  </Text>{" "}
                  {recipe.servings}
                </Text>
              </Col>
            </Grid>
            <Space h="xl" />
            <Text weight="500" size="23px">
              Ingredients
            </Text>
            <Space h="lg" />
            <List>
              {recipe.extendedIngredients.map((ingredient, index) => (
                <List.Item key={index}>{ingredient.original}</List.Item>
              ))}
            </List>
            <Space h="xl" />
            <Text weight="500" size="23px">
              Instructions
            </Text>
            <Space h="lg" />
            <List type="ordered">
              {recipe.analyzedInstructions[0]?.steps.map((step, index) => (
                <List.Item key={index}>{step.step}</List.Item>
              ))}
            </List>
          </Card>
        </Col>
      </Grid>
    </div>
  );
}

export default RecipeDetails;
