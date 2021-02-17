import React from "react";
import { motion } from "framer-motion";
import { scaleUp, showUp } from "../styles/animations";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please, enter your email."),
      password: Yup.string().required("Please, enter your password."),
    }),
    onSubmit: async (values) => {
      console.log(values);
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
        <h1>Log In</h1>
        <motion.form variants={scaleUp} onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="email">Enter your email here:</label>
            <input
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Enter your password here:</label>
            <input
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default Login;
