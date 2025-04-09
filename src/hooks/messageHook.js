import { useFormik } from "formik";
import React from "react";
// import { register } from "../service/auth";
// import api from "../service/api";

function Usemessage(initialValue, onsubmit, name) {
  const formik = useFormik({
    initialValues: initialValue,
    onSubmit:onsubmit
  });
  {
    console.log(formik.values, "ll");
  }
  return {
    formik,
  };
}

export default Usemessage;
