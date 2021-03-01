import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { useQuery, gql } from "@apollo/client";
import Loading from "../components/Loading";
import useUserStore from "../context/userContext";
import Cookie from "js-cookie";

const GET_USER = gql`
  query getUser {
    getUser {
      userName
      email
    }
  }
`;

const NavBar = () => {
  const removeUser = useUserStore((state) => state.removeUser);
  const { data, loading, client } = useQuery(GET_USER);
  const logOut = () => {
    localStorage.removeItem("token");
    Cookie.remove("user");
    client.resetStore();
    removeUser();
  };
  if (loading) return <Loading />;
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
          {!data || !data.getUser ? (
            <Link href="/login">
              <a>
                <button>Login</button>
              </a>
            </Link>
          ) : null}
          {data && data.getUser && (
            <Link href="/profile">
              <a>
                <button>Profile</button>
              </a>
            </Link>
          )}
          {data && data.getUser && (
            <a>
              <button onClick={logOut}>Logout</button>
            </a>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
