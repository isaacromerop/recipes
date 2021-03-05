import React from "react";
import Head from "next/head";
import NavBar from "./NavBar";
import { motion } from "framer-motion";
import { showUp } from "../styles/animations";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Recipes App</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <meta
          name="description"
          content="Look for the recipe you need to impress the person you love!"
        />
      </Head>
      <motion.main
        variants={showUp}
        initial="hidden"
        animate="visible"
        exit="exit"
        key="main-div"
      >
        <NavBar />
        {children}
      </motion.main>
    </>
  );
};

export default Layout;
