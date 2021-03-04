import React from "react";
import { Popup, Icon } from "semantic-ui-react";
import Swal from "sweetalert2";
import { useMutation, gql } from "@apollo/client";

const REMOVE_RECIPE = gql`
  mutation removeRecipe($id: ID!) {
    removeRecipe(id: $id)
  }
`;

const USER_RECIPES = gql`
  query getReciperByUser {
    getRecipesByUser {
      _id
      id
      title
      image
      created
    }
  }
`;

const RemoveButton = ({ id }) => {
  const [removeRecipe] = useMutation(REMOVE_RECIPE, {
    update(cache, {}) {
      //Get object i want to update from cache
      const { getRecipesByUser } = cache.readQuery({
        query: USER_RECIPES,
      });
      //Update cache
      cache.writeQuery({
        query: USER_RECIPES,
        data: {
          getRecipesByUser: getRecipesByUser.filter(
            (recipe) => recipe._id !== id
          ),
        },
      });
    },
  });

  const handleRemoveRecipe = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await removeRecipe({
            variables: {
              id,
            },
          });
          Swal.fire("Recipe removed!", data.removeRecipe, "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <Popup
      content="Remove recipe."
      hideOnScroll
      inverted
      trigger={
        <Icon
          onClick={handleRemoveRecipe}
          size="large"
          link
          color="red"
          name="trash alternate"
        />
      }
    />
  );
};

export default RemoveButton;
