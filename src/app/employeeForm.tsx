"use client";
import React, { useState } from "react";
import { supabase } from "./supabase";

import { Client } from "./types";

const add_Client = () => {
  const [clientInfo, setClientInfo] = useState<Client>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //create user in supabase
    const { data, error } = await supabase.auth.signUp({
      email: clientInfo.email,
      password: "password",
    });

    if (error) {
      console.error("Error creating user:", error.message);
    } else {
      console.log("User created!");
      // data will contain information about the user, not data.user
      // Add user information to the client table
      const { data: clientData, error: clientError } = await supabase
        .from("client")
        .upsert([
          {
            first_name: clientInfo.first_name,
            last_name: clientInfo.last_name,
            email: clientInfo.email,
            phone: clientInfo.phone,
            address: clientInfo.address,
            // Add other client information fields here if necessary
          },
        ]);

      if (clientError) {
        console.error(
          "Error adding user to client table:",
          clientError.message
        );
      } else {
        console.log("User added to client table:", clientData);

        //Sernd account recovery email
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(
          clientInfo.email
        );

        if (resetError) {
          console.error(
            "Failed to send reset password link",
            resetError.message
          );
        } else {
          console.log("Password reset email set successfully!");
        }
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          value={clientInfo.first_name}
          onChange={(e) =>
            setClientInfo({ ...clientInfo, first_name: e.target.value })
          }
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          value={clientInfo.last_name}
          onChange={(e) =>
            setClientInfo({ ...clientInfo, last_name: e.target.value })
          }
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={clientInfo.email}
          onChange={(e) =>
            setClientInfo({ ...clientInfo, email: e.target.value })
          }
        />
      </label>
      <br />
      <label>
        Phone:
        <input
          type="text"
          value={clientInfo.phone}
          onChange={(e) =>
            setClientInfo({ ...clientInfo, phone: e.target.value })
          }
        />
      </label>
      <br />
      <label>
        Address:
        <input
          type="text"
          value={clientInfo.address}
          onChange={(e) =>
            setClientInfo({ ...clientInfo, address: e.target.value })
          }
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default add_Client;
