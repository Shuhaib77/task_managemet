import React from "react";
import Useauth from "../../../hooks/authHook";
import Input from "../../../common/components/input/Input";
import Button from "../../../common/components/button/Button";
import { useNavigate } from "react-router-dom";

function Authe({ name }) {
  const navigate = useNavigate();
  const initialValue =
    name === "Login"
      ? { email: "", password: "", role: "" }
      : { email: "", password: "" };
  const log = [
    { name: "email", type: "text" },
    { name: "password", type: "password" },
  ];
  const reg = [
    { name: "role", type: "text" },
    { name: "email", type: "text" },
    { name: "password", type: "password" },
  ];
  const field = name === "Register" ? reg : log;
  const { formik } = Useauth(initialValue, (values) => {
    console.log(formik.values);
  },name);
  return (
    <>
      <form className="grid grid-cols-1 gap-y-3" onSubmit={formik.handleSubmit}>
        <h1 className="text-2xl text-gray-700 font-semibold ">{name}</h1>
        {field.map((item, i) => (
          <Input
            type={item.type}
            placeholder={item.name}
            handlechange={formik.handleChange}
            handleblur={formik.handleBlur}
            value={formik.values[item.name]}
            name={item.name}
          />
        ))}
        <Button
          name={name}
          type={"submit"}
          className={
            name === "Register"
              ? "bg-blue-800 text-white"
              : "bg-green-700 text-white"
          }
        />
        <h1 className="text-shadow-blue-800 underline cursor-pointer  ">
          {" "}
          {name === "Login" ? (
            <h1
              onClick={() => {
                navigate("/auth/register");
              }}
              className="text-blue-800 underline "
            >
              {" "}
              register?
            </h1>
          ) : (
            <h1 className=""  onClick={() => {
                navigate("/auth");
              }}> Login?</h1>
          )}
        </h1>
      </form>
    </>
  );
}

export default Authe;
