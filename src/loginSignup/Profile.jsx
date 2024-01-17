import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../blog/CreateEdit/Navbar";
import axios from "axios";
import Login from "./Login";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Navigate, useNavigate } from "react-router-dom";

function Profile() {
  let url = "url(https://source.unsplash.com/random)";
  url =
    "url(https://colmanandcompany.com/blog/wp-content/uploads/2014/04/blog-word-cloud1.jpg)";
  const [profile, setProfile] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:3000/blog/profile", {
        headers: {
          Accept: "application/json",
          Authorization: sessionStorage.getItem("acessToken"),
        },
      })
      .then((res) => {
        // console.log(res.data.msg);
        setProfile(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            marginTop: 8,
          }}
        >
          <Grid container>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: `url(${profile.imageurl})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Profile
                </Typography>
                <Box
                  component="form"
                  noValidate
                  // onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  {/* <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    // type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            // onClick={togglePasswordVisibility}
                            edge="end"
                          >
                            {true ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  /> */}
                  <Box component="div" sx={{ whiteSpace: "normal" }}>
                    <b>Name:</b> {profile.name}
                  </Box>

                  <Box component="div" sx={{ whiteSpace: "normal" }}>
                    <b>Email:</b> {profile.email}
                  </Box>

                  <Box component="div" sx={{ whiteSpace: "normal" }}>
                    <b>Number Of Blogs:</b>{" "}
                    {profile.blog && profile.blog.length
                      ? profile.blog.length
                      : 0}
                  </Box>

                  {/* <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button> */}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      {/* <div>
        {profile && (
          <div>
            <h1>{profile.name}</h1>
            <h2>{profile.email}</h2>
            <h3>{profile.blog.length}</h3>
          </div>
        )}
      </div> */}
    </>
  );
}

export default Profile;
