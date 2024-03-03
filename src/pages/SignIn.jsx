import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:5500/api/v1/users/login",
        data,
        {
          withCredentials: true
        }
      );
      console.log(response)
      // Handle successful signin
      console.log("Signin successful");
    } catch (error) {
      console.error("Signin error:", error);
    }
  };

  return (
    <form style={style} className="form" onSubmit={handleSubmit(onSubmit)}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h1>

      <input {...register("email")} placeholder="Email" required />
      {errors.email && <p>{errors.email.message}</p>}
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        required
      />
      {errors.password && <p>{errors.password.message}</p>}
      <button type="submit" style={{ fontWeight: "bold", fontSize: "18px" }}>
        Sign In
      </button>
      <Link style={{ textDecorationLine: "none" }} to={"/signup"}>
        <p
          style={{
            color: "#9EC8B9",
            textDecorationLine: "underline",
            textAlign: "right",
          }}
        >
          Don't have an account? Sign up
        </p>
      </Link>
    </form>
  );
};

export default Signin;
