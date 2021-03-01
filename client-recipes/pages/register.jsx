import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scaleUp, showUp } from "../styles/animations";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useMutation, gql } from "@apollo/client";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const NEW_USER = gql`
  mutation newUser($input: UserInput) {
    newUser(input: $input) {
      userName
      email
    }
  }
`;

const Register = () => {
  const [newUser] = useMutation(NEW_USER);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Please, create your username."),
      email: Yup.string()
        .required("Please, enter your email.")
        .email("Please, provide a valid email."),
      password: Yup.string()
        .required("Please, provide your password.")
        .min(6, "Password must be at least 6 character long."),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await newUser({
          variables: {
            input: {
              userName: values.userName,
              email: values.email,
              password: values.password,
            },
          },
        });
        console.log(data);
        Swal.fire(
          "User Registered.",
          `Welcome to MrCook ${data.newUser.userName}`,
          "success"
        );
        setTimeout(() => {
          router.push("/login");
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
            <motion.div className="login-username">
              <label htmlFor="userName">Username:</label>
              <input
                autoComplete="nope"
                id="userName"
                type="text"
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <AnimatePresence>
                {formik.touched.userName && formik.errors.userName && (
                  <motion.div
                    initial={{ x: -10 }}
                    animate={{ x: 0 }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 500,
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      transition: { type: "tween" },
                    }}
                    className="error-message"
                  >
                    <p>{formik.errors.userName}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
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
                    exit={{
                      opacity: 0,
                      height: 0,
                      transition: { type: "tween" },
                    }}
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
                    exit={{
                      opacity: 0,
                      height: 0,
                      transition: { type: "tween" },
                    }}
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
