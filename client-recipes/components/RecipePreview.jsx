import React from "react";
import { Card, Image } from "semantic-ui-react";

const RecipePreview = ({ id, title, img }) => {
  return (
    <Card fluid>
      <Image size="medium" src={img} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          <span className="date">{id}</span>
        </Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default RecipePreview;
