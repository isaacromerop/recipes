import React from "react";
import { Icon, Popup } from "semantic-ui-react";

const SaveButton = () => {
  return (
    <Popup
      content="Saved!"
      hideOnScroll
      inverted
      on="click"
      trigger={
        <Icon.Group size="large">
          <Icon link color="red" name="heart" />
          <Icon corner name="add" color="red" />
        </Icon.Group>
      }
    />
  );
};

export default SaveButton;
