import React, { useState } from "react";
import { motion } from "framer-motion";
import { showUp, appearUp, scaleUp } from "../styles/animations";
import { Icon, Grid } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLazyQuery, gql } from "@apollo/client";
import RecipePreview from "../components/RecipePreview";

const GET_RECIPES = gql`
  query getRecipes($recipe: String!) {
    getRecipes(recipe: $recipe) {
      id
      title
      image
    }
  }
`;

const ByDish = () => {
  const [error, setError] = useState(null);
  const [getRecipes, { data, loading }] = useLazyQuery(GET_RECIPES);
  const formik = useFormik({
    initialValues: {
      recipe: "",
    },
    validationSchema: Yup.object({
      recipe: Yup.string().required("What are you going to cook?"),
    }),
    onSubmit: async (values) => {
      getRecipes({
        variables: {
          recipe: formik.values.recipe,
        },
      });
    },
  });
  if (loading) return <h1>Loading...</h1>;
  return (
    <motion.div
      variants={showUp}
      initial="hidden"
      animate="visible"
      className="dish-main-container"
    >
      <motion.div variants={appearUp} className="dish-head">
        <p htmlFor="bydish">What dish are you looking for?</p>
        <div className="dish-search">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <input
                name="recipe"
                type="text"
                placeholder="Example: Pasta..."
                value={formik.values.recipe}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button type="submit">
                <Icon fitted name="search" />
              </button>
            </div>
          </form>
        </div>
      </motion.div>
      <motion.div variants={scaleUp} className="dish-body">
        <Grid centered columns={4}>
          <Grid.Row>
            {data &&
              data.getRecipes &&
              data.getRecipes.map((recipe) => (
                <Grid.Column key={recipe.id} style={{ marginBottom: 30 }}>
                  <RecipePreview
                    id={recipe.id}
                    title={recipe.title}
                    img={recipe.image}
                  />
                </Grid.Column>
              ))}
          </Grid.Row>
        </Grid>
      </motion.div>
    </motion.div>
  );
};

export default ByDish;
