import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const NavBar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.7, duration: 0.5, type: "tween" }}
      className="navbar"
    >
      <div className="nav-container">
        <div className="logo">
          <span>Mr. Cook</span>
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
      </div>
    </motion.nav>
  );
};

export default NavBar;
