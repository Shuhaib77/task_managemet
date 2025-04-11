import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
// import { register } from "../service/auth";
// import api from "../service/api";

function Useauth(initialValue, onsubmit, name) {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: async (values) => {
      if (name === "Register") {
        try {
          const res=await axios.post("http://localhost:407/api/register", values);
      
           navigate("/auth");
        } catch (error) {}
      } else {
        try {
         const res= await axios.post("http://localhost:407/api/login", values);
          localStorage.setItem("userId",res.data.data._id)
          navigate("/message");
        } catch (error) {}
      }
      console.log(values);
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
