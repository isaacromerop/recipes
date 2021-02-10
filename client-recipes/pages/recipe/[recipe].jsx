import React from "react";
import { useRouter } from "next/router";

const Recipe = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  return (
    <div>
      <h1>Recipe Page</h1>
    </div>
  );
};

export default Recipe;
