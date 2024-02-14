import { Button } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { validate } from "uuid";

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
const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch("password");
  console.log(errors);

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(
        "http://localhost:5500/api/v1/users/signup",
        data
      );
      console.log(response.data, "eeeee");
      if (response.status === 201) {
        window.localStorage.setItem("email", data.email);
        window.location.pathname = "/";
      }
      console.log("Signup successful");
    } catch (error) {
      console.error("Signup error:", error.response.data.message);
    }
  };

  return (
    <form className="form" style={style} onSubmit={handleSubmit(onSubmit)}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h1>

      <input {...register("fullName")} placeholder="Full Name" required />
      <input
        type="username"
        {...register("username")}
        placeholder="Username"
        required
      />
      <input type="email" {...register("email")} placeholder="Email" required />
      {errors.email && <span>{errors.email.message}</span>}
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        required
      />
      {errors.password && <span>{errors.password.message}</span>}
      <input
        required
        {...register("confirmPassword", {
          validate: (value) =>
            value === password || "The passwords do not match",
        })}
        type="password"
        placeholder="Confirm Password"
      />
      {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
      <button type="submit" style={{ fontWeight: "bold", fontSize: "18px" }}>
        Sign Up
      </button>
      {/* {  sx={{ textDecorationLine: "underline", }} } */}
      <Link to={"/signin"}>
        <p
          style={{
            color: "#9EC8B9",
            textDecorationLine: "underline",
            textAlign: "right",
          }}
        >
          I have Already account!
        </p>
      </Link>
    </form>
  );
};

export default SignupForm;
