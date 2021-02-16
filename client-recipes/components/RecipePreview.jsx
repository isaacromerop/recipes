import React from "react";
import { Card, Image } from "semantic-ui-react";
import { useRouter } from "next/router";
import SaveButton from "./SaveButton";
import Link from "next/link";

const RecipePreview = ({ id, title, img }) => {
  const router = useRouter();
  const recipeDetails = (id) => {
    router.push({
      pathname: "/recipe/[id]",
      query: { id },
    });
  };
  return (
    <Card fluid>
      <Image size="medium" src={img} />
      <Card.Content>
        <div onClick={() => recipeDetails(id)} className="card-header">
          {title}
        </div>
        <Card.Meta className="card-meta">
          <span className="date">id: {id}</span>
          <SaveButton />
        </Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default RecipePreview;
