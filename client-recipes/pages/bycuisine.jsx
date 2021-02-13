import React from "react";
import { motion } from "framer-motion";
import { showUp, appearUp, scaleUp } from "../styles/animations";
import { Icon, Grid } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLazyQuery, gql } from "@apollo/client";
import RecipePreview from "../components/RecipePreview";
import Loading from "../components/Loading";
import { cuisineOptions } from "../cuisine-options";

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
  const [getRecipes, { data, loading }] = useLazyQuery(GET_RECIPES);
  const formik = useFormik({
    initialValues: {
      cuisine: "",
    },
    validationSchema: Yup.object({
      cuisine: Yup.string().required("What are you going to cook?"),
    }),
    onSubmit: async (values) => {
      if (values.cuisine !== "false") {
        console.log(values);
      }
    },
  });
  if (loading) return <Loading />;
  return (
    <motion.div
      variants={showUp}
      initial="hidden"
      animate="visible"
      className="cuisine-main-container"
    >
      <motion.div variants={appearUp} className="dish-head">
        <p htmlFor="bydish">What cuisine for today?</p>
        <div className="dish-search">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <select
                onChange={formik.handleChange}
                value={formik.values.cuisine}
                name="cuisine"
              >
                <option value={false}>Select option from list...</option>
                {cuisineOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button type="submit">
                <Icon fitted name="search" />
              </button>
            </div>
          </form>
        </div>
      </motion.div>
      {data && data.getRecipes && (
        <motion.div variants={scaleUp} className="dish-body">
          <Grid centered columns={4}>
            {data.getRecipes.length > 0 ? (
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
            ) : (
              <h1 style={{ margin: "2rem 0", color: "#eff4f7d0" }}>
                Oops! We could not find your dish.
              </h1>
            )}
          </Grid>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ByDish;
