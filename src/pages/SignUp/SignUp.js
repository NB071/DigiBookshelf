import "./SignUp.scss";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    // validationSchema: Yup.object({
    //   username: Yup.string()
    //     .matches(
    //       /^(?! )\S+(?: \S+)*$/,
    //       "Username shoudn't only contain, start or end with space character"
    //     )
    //     .required("This field is required"),
    //   password: Yup.string()
    //     .matches(
    //       /^(?! )\S+(?: \S+)*$/,
    //       "password shoudn't only contain, start or end with space character"
    //     )
    //     .required("This field is required"),
    // }),

    onSubmit: async (values, e) => {
      // Handle form submission here
    },
  });

  return <h1>SignUp</h1>;
}
