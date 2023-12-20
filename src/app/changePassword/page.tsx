// ChangePasswordPage.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/supabase";

const ChangePasswordPage: React.FC = () => {
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      //change password using supabase
      const { data, error } = await supabase.auth.updateUser({
        // id:supabase.auth.user()?.id,
        password: newPassword,
      });

      if (error) {
        //handle password update error
        console.error("Error updating password: ", error.message);
        return;
      }

      //password updatated sucessfully
      console.log("Password Updated Successfully: , user");
      //redirect to login

      router.push("/login");
    } catch (error) {
      console.error("Unexpected error:", (error as Error).message);
      //Handle unpected errors, redirect or alert
    }
  };
  return (
    <div>
      <h1>Change Password</h1>
      <label>New Password:</label>
      <input
        type="password"
        value={newPassword}
        onChange={handleNewPasswordChange}
      />
      <br />
      <label>Confirm Password:</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
      <br />
      <button
        style={{ backgroundColor: "blue", color: "white" }}
        onClick={handleChangePassword}
      >
        Change Password
      </button>
    </div>
  );
};
export default ChangePasswordPage;
