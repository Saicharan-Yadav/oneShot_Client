import React from "react";
import LoginSignUpNavbar from "./LoginSignUpNavbar";
import Login from "./Login";

function Home() {
  return (
    <div>
      <LoginSignUpNavbar navbutton={"Sign-Up"} />
      <Login />
    </div>
  );
}

export default Home;
