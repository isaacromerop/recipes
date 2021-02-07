import Head from "next/head";
import { motion } from "framer-motion";
import { showUp, appear } from "../styles/animations";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Recipes App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.main variants={showUp} initial="hidden" animate="visible">
        <div className="main-container">
          <motion.div variants={appear} className="content-container">
            <div>
              <h1>Don't know what to cook?</h1>
            </div>
            <div>
              <div className="find-recipes">
                <h2>Find recipes</h2>
              </div>
              <div className="button-container">
                <Link href="/bydish">
                  <a>
                    <button>by Dishes</button>
                  </a>
                </Link>
                <Link href="/bycuisine">
                  <a>
                    <button>by Cuisine</button>
                  </a>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
}
