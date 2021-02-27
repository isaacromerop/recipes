import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scaleUp, showUp } from "../styles/animations";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useMutation, gql } from "@apollo/client";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import Cookie from "js-cookie";
import useUserStore from "../context/userContext";

const USER_AUTH = gql`
  mutation userAuth($input: AuthInput) {
    userAuth(input: $input) {
      token
    }
  }
`;

const Register = () => {
  const setUser = useUserStore((state) => state.setUser);
  const [userAuth, { client }] = useMutation(USER_AUTH, {
    update(_, results) {
      const user = jwt.decode(results.data.userAuth.token);
      const { userName, ...rest } = user;
      Cookie.set("user", JSON.stringify(userName), { expires: 1 });
      setUser(userName);
    },
  });
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Please, enter your email.")
        .email("Please, enter a valid email."),
      password: Yup.string().required("Please, enter your password."),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await userAuth({
          variables: {
            input: {
              email: values.email,
              password: values.password,
            },
          },
        });
        const { token } = data.userAuth;
        client.resetStore();
        localStorage.setItem("token", token);
        Swal.fire("Welcome!", "User logged in", "success");
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } catch (error) {
        console.log(error.message);
        Swal.fire("Oops!", error.message, "error");
      }
    },
  });
  return (
    <motion.div
      className="login-page"
      variants={showUp}
      initial="hidden"
      animate="visible"
    >
      <div className="login-content">
        <div className="login-form">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, type: "tween" }}
          >
            Register
          </motion.h1>
          <motion.form variants={scaleUp} onSubmit={formik.handleSubmit}>
            <motion.div className="login-email">
              <label htmlFor="email">Email:</label>
              <input
                autoComplete="nope"
                id="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <AnimatePresence>
                {formik.touched.email && formik.errors.email && (
                  <motion.div
                    initial={{ x: -10 }}
                    animate={{ x: 0 }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 500,
                    }}
                    exit={{ opacity: 0, transition: { type: "tween" } }}
                    className="error-message"
                  >
                    <p>{formik.errors.email}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div className="login-password">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <AnimatePresence>
                {formik.touched.password && formik.errors.password && (
                  <motion.div
                    initial={{ x: -10 }}
                    animate={{ x: 0 }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 500,
                    }}
                    exit={{ opacity: 0, transition: { type: "tween" } }}
                    className="error-message"
                  >
                    <p>{formik.errors.password}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <button className="login-button" type="submit">
              Register
            </button>
          </motion.form>
        </div>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5, type: "tween" }}
        >
          Already have an account? Log In{" "}
          <Link href="/login">
            <a>here</a>
          </Link>
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Register;
