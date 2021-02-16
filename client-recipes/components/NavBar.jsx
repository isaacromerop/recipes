import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { appearUp } from "../styles/animations";

const NavBar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.5, type: "tween" }}
      className="navbar"
    >
      <div className="logo">
        <span style={{color: "white"}}>Logo Navbar</span>
      </div>
      <div className="navigation">
        <Link href="/login">
          <a>
            <button>Login</button>
          </a>
        </Link>
        <Link href="/profile">
          <a>
            <button>Profile</button>
          </a>
        </Link>
        <a>
          <button>Logout</button>
        </a>
      </div>
    </motion.nav>
  );
};

export default NavBar;
