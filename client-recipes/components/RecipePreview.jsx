import React from "react";
import { Card } from "semantic-ui-react";
import { useRouter } from "next/router";
import SaveButton from "./SaveButton";
import RemoveButton from "./RemoveButton";
import useUserStore from "../context/userContext";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { scaleUp } from "../styles/animations";

const RecipePreview = ({ id, title, img, _id }) => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const recipeDetails = (id) => {
    router.push({
      pathname: "/recipe/[id]",
      query: { id },
    });
  };
  return (
    <AnimatePresence>
      <motion.div
        variants={scaleUp}
        initial="hidden"
        animate="visible"
        className="ui fluid card card-container"
      >
        <Image size="medium" src={img} width={312} height={231} />
        <Card.Content className="card-content">
          <div onClick={() => recipeDetails(id)} className="card-header">
            {title}
          </div>
          <Card.Meta className="card-meta">
            <span className="date">id: {id}</span>
            {user &&
              (router.pathname === "/bycuisine" ||
              router.pathname === "/bydish" ? (
                <SaveButton id={id} title={title} img={img} />
              ) : (
                <RemoveButton id={_id} />
              ))}
          </Card.Meta>
        </Card.Content>
      </motion.div>
    </AnimatePresence>
  );
};

export default RecipePreview;
