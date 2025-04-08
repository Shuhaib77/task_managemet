import { useFormik } from "formik";
import React from "react";
import { register } from "../service/auth";
import api from "../service/api";

function Useauth(initialValue, onsubmit, name) {
  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: async (values) => {
      if (name === "Register") {
        console.log(values, "pp");
        api.post("/register", values);
        alert("hii");
      } else {
        console.log("hii");
      }
    },
  });
  {
    console.log(formik.values, "ll");
  }
  return {
    formik,
  };
}

export default Useauth;
