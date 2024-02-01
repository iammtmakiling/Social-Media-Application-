import React, { useState } from "react";
import "./signin.css";
import coffee from "../../assets/coffee.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserSignInSchema } from "../../assets/schema";
import { useNavigate } from "react-router-dom";
import { useUserAppContext } from "../../context/UserContext";

//PURPOSE: Signing In
const SignIn = () => {
  let navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(UserSignInSchema) });

  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");

  const { signIn } = useUserAppContext();
  const submitForm = async (data) => {
    setloading(true);
    try {
      const response = await fetch("/api/user/log-in", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "CONTENT-TYPE": "application/json" },
      });
      const user = await response.json();
      if (user.status === "fail") throw new Error(user.message);
      signIn(user);

      reset();
    } catch (err) {
      console.log(error);
      setError(err.message);
    }
    setloading(false);
    setTimeout(() => setError(""), 3000);
  };

  return (
    <div className="container">
      <div className="placeHolder">
        <div className="firstPart">
          <img src={coffee} alt="coffee.png" className="coffee" />
          <h1 className="header1"> SIGN IN </h1>
          <form onSubmit={handleSubmit(submitForm)}>
            <p className="signin-error-text">{error}</p>
            <input
              className="box"
              type="text"
              placeholder="Email"
              {...register("email")}
            />
            <p className="signin-error">{errors?.email?.message}</p>
            <input
              className="box"
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            <p className="signin-error">{errors?.password?.message}</p>
            <button className="classic-button" disabled={loading}>
              {loading ? "PLEASE WAIT" : "LOG IN"}
            </button>
          </form>
        </div>
        <div className="secondPart">
          <h1 className="header2"> WELCOME BACK </h1>
          <p>Still not a member?</p>
          <p>Don’t worry, signing up is free.</p>
          <button
            className="classic-button"
            onClick={() => {
              navigate("/sign-up");
            }}
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
