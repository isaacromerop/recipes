import React from "react";
import { motion } from "framer-motion";
import { showUp, appearUp, scaleUp } from "../styles/animations";
import { Icon, Grid } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLazyQuery, gql } from "@apollo/client";
import RecipePreview from "../components/RecipePreview";
import Loading from "../components/Loading";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      recipe: "",
    },
    validationSchema: Yup.object({
      recipe: Yup.string().required("What are you going to cook?"),
    }),
    onSubmit: (values) => {
      getRecipes({
        variables: {
          recipe: formik.values.recipe,
        },
      });
    },
  });
  if (loading) return <Loading />;
  return (
    <motion.div
      variants={showUp}
      initial="hidden"
      animate="visible"
      className="dish-main-container"
    >
      <motion.div variants={appearUp} className="dish-head">
        <button onClick={() => router.push("/")} className="back-button">
          <Icon name="arrow left" size="big" />
        </button>
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
      {data && data.getRecipes && (
        <motion.div variants={scaleUp} className="dish-body">
          <Grid centered>
            {data.getRecipes.length > 0 ? (
              <Grid.Row>
                {data &&
                  data.getRecipes &&
                  data.getRecipes.map((recipe) => (
                    <Grid.Column
                      mobile={16}
                      tablet={8}
                      computer={4}
                      key={recipe.id}
                      style={{ marginBottom: 30 }}
                    >
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
