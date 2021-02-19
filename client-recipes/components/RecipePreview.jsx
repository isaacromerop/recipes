import React from "react";
import { Card, Image } from "semantic-ui-react";
import { useRouter } from "next/router";
import SaveButton from "./SaveButton";
import useUserStore from "../context/userContext";

const RecipePreview = ({ id, title, img }) => {
  const user = useUserStore((state) => state.user);
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
          {user && <SaveButton />}
        </Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default RecipePreview;
