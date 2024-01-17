import * as React from "react";
import { useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./Login";
import LoginSignUpNavbar from "./LoginSignUpNavbar";
import axios from "axios";
import UploadFileTwoToneIcon from "@mui/icons-material/UploadFileTwoTone";

import { useNavigate } from "react-router-dom";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const password1Ref = useRef(null);
  const emailRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let name = nameRef.current.value;
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    let password1 = password1Ref.current.value;

    const data = {
      email: email,
      name: name,
      password: password,
      retypePassword: password1,
      imageurl: imageUrl,
    };

    console.log(data);

    axios
      .post("http://localhost:3000/signup", data)
      .then((res) => {
        console.log(res.data.msg);
        if (res.data.msg === "User created successfully") {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("error=>" + err);
      });
  };

  const submitImage = (e) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "blog_preset");
    data.append("cloud_name", "dxy5iorbc");

    axios
      .post("https://api.cloudinary.com/v1_1/dxy5iorbc/image/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data.secure_url); // This might be res.data or res.data.url, depending on Cloudinary's response structure.
        setImageUrl(res.data.secure_url);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <LoginSignUpNavbar navbutton={"/"} />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: 3,
              borderRadius: 2,
              px: 4,
              py: 6,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Name"
                    inputRef={nameRef}
                    autoFocus
                  />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    inputRef={emailRef}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    inputRef={passwordRef}
                    autoComplete="new-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password1"
                    label="Re-Type Password"
                    type={showPassword ? "text" : "password"}
                    id="password1"
                    inputRef={password1Ref}
                    autoComplete="new-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box
                    component="span"
                    sx={{
                      display: "block",
                      p: 1,
                      m: 1,
                      bgcolor: (theme) =>
                        theme.palette.mode === "dark" ? "#101010" : "#fff",
                      color: (theme) =>
                        theme.palette.mode === "dark" ? "grey.300" : "grey.800",
                      border: "1px solid",
                      borderColor: (theme) =>
                        theme.palette.mode === "dark" ? "grey.800" : "grey.300",
                      borderRadius: 2,
                      fontSize: "0.875rem",
                      fontWeight: "700",
                    }}
                  >
                    Password must
                    <li>Be at least 8 characters long.</li>
                    <li>Be no longer than 100 characters.</li>
                    <li>Contain at least one uppercase letter.</li>
                    <li>Contain at least one lowercase letter.</li>
                    <li>Contain at least one digit.</li>
                    <li>Not contain spaces. </li>
                    <li>Not be one of the specified common passwords.</li>
                  </Box>
                </Grid>

                {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid> */}
              </Grid>
              <Grid item xs={12}>
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    p: 1,
                    m: 1,
                    bgcolor: (theme) =>
                      theme.palette.mode === "dark" ? "#101010" : "#fff",
                    color: (theme) =>
                      theme.palette.mode === "dark" ? "grey.300" : "grey.800",
                    border: "1px solid",
                    borderColor: (theme) =>
                      theme.palette.mode === "dark" ? "grey.800" : "grey.300",
                    borderRadius: 2,
                    fontSize: "0.875rem",
                    fontWeight: "700",
                  }}
                >
                  <UploadFileTwoToneIcon />
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={submitImage}
                  >
                    Upload
                  </Button>
                </Box>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
