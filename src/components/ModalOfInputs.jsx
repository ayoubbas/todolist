import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Stack, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
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

export function ModalOfInputs({
  handleOpen,
  open,
  handleClose,
  onSubmit,
  isAddTodo,
  onChangeTitle,
  onChangeDetails,
  titleValue,
  detailsValue,
  kindOfModal,
  handleOpenAddModal,
  handleBtnEdite,
}) {
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <TextField
            id="outlined-text"
            label="Title of todo"
            sx={{ margin: " 10px 0", width: "100%" }}
            onChange={(e) => onChangeTitle(e.target.value)}
            value={titleValue}
          />
          <TextField
            id="outlined-text"
            label="details of todo"
            sx={{ margin: " 10px 0", width: "100%" }}
            value={detailsValue}
            onChange={(e) => onChangeDetails(e.target.value)}
          />
          <Stack
            spacing={2}
            direction="row"
            sx={{ justifyContent: "flex-end" }}
          >
            {kindOfModal === "add" ? (
              <Button
                variant="contained"
                // sx={{ display: isAddTodo === 0 ? "none" : "block" }}
                onClick={() => {
                  onSubmit();
                  handleClose();
                }}
                disabled={titleValue.length === 0 || detailsValue.length === 0}
              >
                Add
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  handleBtnEdite();
                  handleClose();
                }}
                // sx={{ display: isAddTodo !== 0 ? "none" : "block" }}
              >
                Edit
              </Button>
            )}
            {/*  */}
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
// ! login *********************************************************

export function ModalOfLogin({
  handleCloseLogin,
  open,
  isAddTodo,
  setOpenLogin,
  setOpenRegister,
}) {
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal open={open} onClose={handleCloseLogin}>
        <Box sx={style}>
          <TextField
            id="outlined-text-email-login"
            label="Email"
            sx={{ margin: " 10px 0", width: "100%" }}
          />
          <TextField
            id="outlined-password-input-login"
            label="Password"
            type="password"
            autoComplete="current-password"
            sx={{ margin: " 10px 0", width: "100%" }}
          />

          <Stack
            spacing={2}
            direction="row"
            sx={{ justifyContent: "space-between" }}
          >
            <Button
              variant="text"
              size="small"
              color={"warning"}
              sx={{ textDecorationLine: "underline" }}
              onClick={() => {
                setOpenRegister(true);
                setOpenLogin(false);
              }}
            >
              I don't have any account!
            </Button>
            <Button
              variant="contained"
              sx={{
                display: isAddTodo === 0 ? "none" : "block",
                bgcolor: "#5C8374",
                "&:hover": {
                  bgcolor: "#092635",
                },
              }}
            >
              Login
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

// ! register *********************************************************
export function ModalOfRegister({
  openRegister,
  openLogin,
  setOpenLogin,
  setOpenRegister,
  handleCloseRegister,
  isAddTodo,
}) {
  // !===========
  const [disableBtn, setDisableBtn] = useState(true);
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    username: "",
    password: "",
    password_confirmation: "",
    email: "",
  });
  // !===========
  const validateField = (fieldName, value, repeatpasswordValue) => {
    console.log(repeatpasswordValue);
    // Use the appropriate regex pattern for each field
    switch (fieldName) {
      case "fullName":
        return /^(?=.{1,50}$)[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(value);
      case "username":
        return /^(?=.{3,20}$)[a-zA-Z0-9_]+$/.test(value);
      case "password":
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(value);
      case "repeatpassword":
        return value === repeatpasswordValue;
      case "email":
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
      default:
        return true; // Default to true if no specific validation
    }
  };
  // const handleInputChange = (fieldName, value) => {
  //   setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
  //   setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
  // };
  const handleInputChange = (fieldName, value) => {
    setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: validateField(fieldName, value, form.password)
        ? ""
        : "Invalid input",
    }));
    const hasError = Object.values(errors).some(
      (error) => error === "Invalid input"
    );
    setDisableBtn(hasError);
    console.log(hasError);
  };

  const handleBlur = (fieldName, value) => {
    console.log(fieldName, value);
    // const isValid = validateField(fieldName, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: validateField(fieldName, value, form.password)
        ? ""
        : "Invalid input",
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidForm = Object.values(errors).every((error) => error === "");

    if (isValidForm) {
      let resonse = axios
        .post("http://localhost:5500/api/v1/users/signup", form)
        .then((res) => console.log(res.data.data));
      console.log("Form is valid. Submitting...");
    } else {
      console.log("Form is invalid. Please correct the errors.");
    }
  };
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal open={openRegister} onClose={handleCloseRegister}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Box sx={style}>
            <TextField
              id="outlined-text-name-register"
              label="Name"
              name="fullName"
              value={form.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              onBlur={(e) => handleBlur("fullName", e.target.value)}
              error={!!errors.fullName}
              sx={{ margin: " 10px 0", width: "100%" }}
            />
            <TextField
              id="outlined-text-usename"
              label="Username"
              name="username"
              value={form.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              onBlur={(e) => handleBlur("username", e.target.value)}
              error={!!errors.username}
              sx={{ margin: " 10px 0", width: "100%" }}
            />
            <TextField
              id="outlined-password-input-register"
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              onBlur={(e) => handleBlur("password", e.target.value)}
              error={!!errors.password}
              autoComplete="current-password"
              sx={{ margin: " 10px 0", width: "100%" }}
            />
            <TextField
              id="outlined-password-input-register-confirm"
              label="Repeat Password"
              type="password"
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={(e) =>
                handleInputChange("password_confirmation", e.target.value)
              }
              onBlur={(e) =>
                handleBlur("password_confirmation", e.target.value)
              }
              error={!!errors.password_confirmation}
              autoComplete="current-password"
              sx={{ margin: " 10px 0", width: "100%" }}
            />
            <TextField
              id=""
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              onBlur={(e) => handleBlur("email", e.target.value)}
              error={!!errors.email}
              sx={{ margin: " 10px 0", width: "100%" }}
            />
            <Stack
              spacing={2}
              direction="row"
              sx={{ justifyContent: "space-between" }}
            >
              <Button
                variant="text"
                size="small"
                sx={{ textDecorationLine: "underline", color: "#9EC8B9" }}
                onClick={() => {
                  setOpenLogin(true);
                  setOpenRegister(false);
                }}
              >
                I have Already account!
              </Button>
              <Button
                type="submit"
                variant="contained"
                // disabled={disableBtn}
                sx={{
                  // display: isAddTodo === 0 ? "none" : "block",
                  bgcolor: "#5C8374",
                  "&:hover": {
                    bgcolor: "#092635",
                  },
                }}
              >
                Register
              </Button>
            </Stack>
          </Box>
        </form>
      </Modal>
    </div>
  );
}
