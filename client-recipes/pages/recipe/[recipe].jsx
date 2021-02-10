import React from "react";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import Loading from "../../components/Loading";

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
          <div className="recipe-head">
            <h1>{data.getRecipe.title}</h1>
          </div>
          <div className="recipe-body">
            <div className="">
              <img src={data.getRecipe.image} />
            </div>
            <div className="">
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
            <div className="source">
              <a href={data.getRecipe.spoonacularSourceUrl}>More info...</a>
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
