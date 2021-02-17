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
import { useRouter } from "next/router";

const GET_RECIPES_BY_CUISINE = gql`
  query getRecipeByCuisine($cuisine: String!) {
    getRecipeByCuisine(cuisine: $cuisine) {
      id
      title
      image
    }
  }
`;

const ByDish = () => {
  const [getRecipeByCuisine, { data, loading }] = useLazyQuery(
    GET_RECIPES_BY_CUISINE
  );
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      cuisine: "",
    },
    validationSchema: Yup.object({
      cuisine: Yup.string().required("What are you going to cook?"),
    }),
    onSubmit: (values) => {
      if (values.cuisine !== "false") {
        try {
          getRecipeByCuisine({
            variables: {
              cuisine: formik.values.cuisine,
            },
          });
        } catch (error) {
          console.log(error);
        }
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
        <button onClick={() => router.push("/")} className="back-button">
          <Icon name="arrow left" size="big" />
        </button>
        <div className="dish-search">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <select
                className="cuisine-select"
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
      {data && data.getRecipeByCuisine && (
        <motion.div variants={scaleUp} className="dish-body">
          <Grid centered columns={4}>
            {data.getRecipeByCuisine.length > 0 ? (
              <Grid.Row>
                {data &&
                  data.getRecipeByCuisine &&
                  data.getRecipeByCuisine.map((recipe) => (
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
