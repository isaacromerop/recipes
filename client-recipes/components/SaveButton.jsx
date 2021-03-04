import React from "react";
import { Icon, Popup } from "semantic-ui-react";
import { useMutation, gql } from "@apollo/client";
import Swal from "sweetalert2";

const SAVE_RECIPE = gql`
  mutation saveRecipe($input: RecipeInput) {
    saveRecipe(input: $input) {
      id
      title
      image
    }
  }
`;

const SaveButton = ({ id, title, img }) => {
  const [saveRecipe] = useMutation(SAVE_RECIPE);

  const handleSaveRecipe = async () => {
    try {
      const { data } = await saveRecipe({
        variables: {
          input: {
            title,
            id,
            image: img,
          },
        },
      });
      Swal.fire("Great!", "Recipe saved in profile.", "success");
    } catch (error) {
      console.log(error.message);
      Swal.fire("Ooops...", error.message, "error");
    }
  };

  return (
    <Popup
      content="Save recipe."
      hideOnScroll
      inverted
      trigger={
        <Icon.Group onClick={handleSaveRecipe} size="large">
          <Icon link color="red" name="heart" />
          <Icon corner name="add" color="red" />
        </Icon.Group>
      }
    />
  );
};

export default SaveButton;
