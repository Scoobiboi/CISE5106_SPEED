"use client";
import TextField from "@mui/material/TextField";
import "./Login.css";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import CryptoJS from "crypto-js";

// const url = "http://localhost:8080";
const url = "https://cise-5106-speed-backend.vercel.app";

const encryptionKey = "2147000000maxcash";
const cookies = new Cookies();

const encryptData = (data) => {
  const encrypted = CryptoJS.AES.encrypt(data, encryptionKey);
  return encrypted.toString();
};

const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

function Login({ onLogin }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLoginClick = async () => {
    console.log("Email:", email);
    console.log("Password:", password);
    // You can call your login request function here
    const response = await attemptLogin(email, password);
    console.log(response);
    if (response.status == "success") {
      onLogin(email, password, response.userStatus);
      cookies.set("email", encryptData(email), { path: "/" });
      cookies.set("password", encryptData(password), { path: "/" });
      console.log("Cookies set:", cookies.getAll());
    } else {
      document.getElementById("status").textContent =
        "Invalid email or password, please try again.";
    }
  };

  useEffect(() => {
    const encryptedEmail = cookies.get("email");
    const encryptedPassword = cookies.get("password");

    if (encryptedEmail && encryptedPassword) {
      setEmail(decryptData(encryptedEmail));
      setPassword(decryptData(encryptedPassword));
    }
  }, []);

  useEffect(() => {
    const encryptedEmail = cookies.get("email");
    const encryptedPassword = cookies.get("password");
    if (encryptedEmail && encryptedPassword)
      if (
        email == decryptData(encryptedEmail) &&
        password == decryptData(encryptedPassword)
      ) {
        handleLoginClick();
      }
  }, [email, password]);

  return (
    <div className="login-container-outer">
      <div className="login-container">
        <div className="info">
          Sign in to access our academic article database
        </div>
        <div className="textfield">
          <TextField
            required
            id="outlined-required"
            placeholder="Email"
            color="success"
            sx={{ input: { color: "white" } }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="textfield">
          <TextField
            required
            id="outlined-required"
            placeholder="Password"
            type="password"
            color="success"
            sx={{ input: { color: "white" } }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button onClick={handleLoginClick}>Login</button>
          <a id="status"></a>
        </div>
      </div>
    </div>
  );
}
export default Login;

async function attemptLogin(email, password) {
  const formData = new URLSearchParams();
  formData.append("email", email);
  formData.append("password", password);
  try {
    const response = await fetch(`${url}` + `/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (response.status === 200 || response.status === 201) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}
