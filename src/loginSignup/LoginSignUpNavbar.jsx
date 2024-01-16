import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

function LoginSignUpNavbar(props) {
  const buttonStyle = {
    textDecoration: "none", // Remove underline
    color: "inherit", // Use the default text color
    background: "none", // Remove background color
    border: "none", // Remove border
    cursor: "pointer", // Show pointer cursor on hover
    // Add any additional styles you need
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            24/7 Blogs
          </Typography>
          <Link to={props.navbutton} style={buttonStyle}>
            <Button color="inherit">
              {props.navbutton === "/" ? "Sign-In" : props.navbutton}
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default LoginSignUpNavbar;
