import React from "react";
import { Card } from "semantic-ui-react";
import { useRouter } from "next/router";
import SaveButton from "./SaveButton";
import useUserStore from "../context/userContext";
import Image from "next/image";

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
    <div className="ui fluid card card-container">
      <Image size="medium" src={img} width={312} height={231} />
      <Card.Content className="card-content">
        <div onClick={() => recipeDetails(id)} className="card-header">
          {title}
        </div>
        <Card.Meta className="card-meta">
          <span className="date">id: {id}</span>
          {user && <SaveButton />}
        </Card.Meta>
      </Card.Content>
    </div>
  );
};

export default RecipePreview;
