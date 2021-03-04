import React from "react";
import useUserStore from "../context/userContext";
import Loading from "../components/Loading";
import RecipePreview from "../components/RecipePreview";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { showUp } from "../styles/animations";
import { useQuery, gql } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";

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

const Profile = () => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const { data, loading } = useQuery(USER_RECIPES);
  if (loading) return <Loading />;
  return user ? (
    <motion.div
      variants={showUp}
      initial="hidden"
      animate="visible"
      className="profile-page"
    >
      <div className="profile">
        <div className="dish-head">
          <h1>Profile Page</h1>
        </div>
        <motion.div className="profile-body">
          <Grid centered columns={4}>
            {data.getRecipesByUser.length > 0 ? (
              <Grid.Row>
                <Transition.Group>
                  {data &&
                    data.getRecipesByUser &&
                    data.getRecipesByUser.map((recipe) => (
                      <Grid.Column
                        key={recipe._id}
                        style={{ marginBottom: 30 }}
                      >
                        <RecipePreview
                          _id={recipe._id}
                          id={recipe.id}
                          title={recipe.title}
                          img={recipe.image}
                        />
                      </Grid.Column>
                    ))}
                </Transition.Group>
              </Grid.Row>
            ) : (
              <h1 style={{ margin: "2rem 0", color: "#eff4f7d0" }}>
                Oops! You do not have dishes saved.
              </h1>
            )}
          </Grid>
        </motion.div>
      </div>
    </motion.div>
  ) : (
    <div className="profile-page">
      <div className="profile-content">
        <h1>Go to login</h1>
        <button
          onClick={() => router.push("/login")}
          className="profile-gotoLogin"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Profile;
