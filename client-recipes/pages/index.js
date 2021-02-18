import { motion } from "framer-motion";
import { appearLeft } from "../styles/animations";
import Link from "next/link";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="main-container">
        <motion.div
          variants={appearLeft}
          key="main-container"
          className="content-container"
        >
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
    </Layout>
  );
}
