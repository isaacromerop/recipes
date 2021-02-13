import React from "react";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import Loading from "../../components/Loading";
import Link from "next/link";

const GET_RECIPE = gql`
  query getRecipe($id: ID!) {
    getRecipe(id: $id) {
      id
      title
      image
      summary
      analyzedInstructions {
        steps {
          number
          step
        }
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
    <div>
      {data && data.getRecipe ? (
        <div className="recipe-container">
          <div className="recipe-image">
            <div className="image-container">
              <img src={data.getRecipe.image} />
            </div>
          </div>
          <div className="recipe-body">
            <div className="body-container">
              <div className="recipe-head">
                <h1>{data.getRecipe.title}</h1>
              </div>
              <div className="recipe-summary">
                <div
                  dangerouslySetInnerHTML={{ __html: data.getRecipe.summary }}
                ></div>
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
          </div>
        </div>
      ) : (
        <button onClick={() => router.push("/")}>Back</button>
      )}
    </div>
  );
};

export default Recipe;
