"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/supabase";
import Error from "next/error";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: "example@email.com",
        password: "example-password",
      });

      if (error) {
        console.log("error singing in:", (error as any).message);
        return;
        //handle login error...maybe redirect or ALERT
      }
      console.log("You're signed in Successfully");

      //router.push("/dashboard");
      //fix route appropriately.
    } catch (error) {
      console.error("Unexpected error:", (error as any).message);
      // Handle unexpected errors, show an alert or redirect to an error page
    }
  };
  const handleForgotPassword = async () => {
    try {
      //Sends the user a log in link via email.
      //  Once logged in you should direct the user to a new password form.
      //  And use "Update User" below to save the new password.
      let { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        console.error("Error initiating password reset: ", error.message);
        return;
      }
      console.log("Password reset initiated Successfully!");
      //Redirect to changePassword Page
      router.push("/changePassword");
    } catch (error: any) {
      console.log(
        "Unexpected error:",
        (error && error.message) || "Unknown error"
      );
      //handle unexpected errors, show as ALERT or redirect to an error page.
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <label>Email:</label>
      <input type="text" value={email} onChange={handleEmailChange} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={handlePasswordChange} />
      <br />
      <button
        style={{ backgroundColor: "blue", color: "white" }}
        onClick={handleLogin}
      >
        Login
      </button>
      <br />
      <button onClick={handleForgotPassword}>Forgot Password?</button>
    </div>
  );
};
export default LoginPage;
