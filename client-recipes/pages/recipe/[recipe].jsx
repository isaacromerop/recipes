import React from "react";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import Loading from "../../components/Loading";
import Link from "next/link";
import { motion } from "framer-motion";
import { scaleUp, showUp, appearRight } from "../../styles/animations";
import { Icon } from "semantic-ui-react";

const GET_RECIPE = gql`
  query getRecipe($id: ID!) {
    getRecipe(id: $id) {
      id
      title
      image
      summary
      servings
      readyInMinutes
      analyzedInstructions {
        steps {
          number
          step
        }
      }
      extendedIngredients {
        id
        originalString
      }
      spoonacularSourceUrl
    }
  }
`;

const Recipe = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const { data, loading } = useQuery(GET_RECIPE, {
    variables: {
      id,
    },
  });
  if (loading) return <Loading />;
  return (
    <motion.div
      variants={showUp}
      initial="hidden"
      animate="visible"
      className="recipe-main-container"
    >
      {data && data.getRecipe ? (
        <div className="recipe-container">
          <div className="recipe-image">
            <motion.div variants={scaleUp} className="image-container">
              <img src={data.getRecipe.image} />
            </motion.div>
          </div>
          <motion.div variants={appearRight} className="recipe-body">
            <div className="body-container">
              <div className="recipe-head">
                <h1>{data.getRecipe.title}</h1>
              </div>
              <div className="recipe-summary">
                <p
                  dangerouslySetInnerHTML={{ __html: data.getRecipe.summary }}
                ></p>
              </div>
              <div className="recipe-info">
                <div className="ready-in-minutes">
                  <Icon name="clock outline" size="big" />
                  <span>Ready in: {data.getRecipe.readyInMinutes} minutes</span>
                </div>
                <div className="servings">
                  <Icon name="food" size="big" />
                  <span>Servings: {data.getRecipe.servings}</span>
                </div>
              </div>
              <div className="ingredients">
                <ul>
                  {data.getRecipe.extendedIngredients.map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.originalString}</li>
                  ))}
                </ul>
              </div>
              <div className="steps">
                <ol>
                  {data.getRecipe.analyzedInstructions[0].steps.map((step) => (
                    <li key={step.number}>{step.step}</li>
                  ))}
                </ol>
              </div>
              <Link
                href={data.getRecipe.spoonacularSourceUrl}
                className="source"
              >
                <a target="_blank">More info...</a>
              </Link>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="goback">
          <button onClick={() => router.push("/")}>Back</button>
        </div>
      )}
    </motion.div>
  );
};

export default Recipe;
