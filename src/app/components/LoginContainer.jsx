"use client";
import Profile from "./Profile";
import Login from "./Login";
import React, { useState } from "react";
function LoginContainer() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userStatus, setUserStatus] = useState("");

  const handleLogin = (email, password, userStatus) => {
    // You can add your login logic here, and if successful, set loggedIn to true
    setUserStatus(userStatus);
    setLoggedIn(true);
    console.log(email, password, userStatus);
  };

  return (
    <>
      {loggedIn ? (
        <Profile userStatus={userStatus} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}

export default LoginContainer;
