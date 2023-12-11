"use client";
import React, { useState } from "react";
import { add_employee } from "../supabase"; // Import the function from supabase
import { Employee } from "../types";

export default function NewEmployee() {
  // const[EmployeeInfo,setEmployeeInfo] = useState(" ")
  const [EmployeeInfo, setEmployeeInfo] = useState<Employee>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await add_employee(EmployeeInfo);

      if (result) {
        console.log("Employee added to supabase successfully!");
      } else {
        console.error("Failed to add employee to supabse");
      }
    } catch (error: any) {
      console.error(
        "Error adding employee to the databse: ",
        (error as Error)?.message ?? "Unknown error"
      );
    }
  };
  const inputTextStyle = {
    color: "black", // Change this to the desired color
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          value={EmployeeInfo.first_name}
          onChange={(e) =>
            setEmployeeInfo({ ...EmployeeInfo, first_name: e.target.value })
          }
          style={inputTextStyle} // Apply the style here
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          value={EmployeeInfo.last_name}
          onChange={(e) =>
            setEmployeeInfo({ ...EmployeeInfo, last_name: e.target.value })
          }
          style={inputTextStyle} // Apply the style here
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={EmployeeInfo.email}
          onChange={(e) =>
            setEmployeeInfo({ ...EmployeeInfo, email: e.target.value })
          }
          style={inputTextStyle} // Apply the style here
        />
      </label>
      <br />
      <label>
        Phone:
        <input
          type="text"
          value={EmployeeInfo.phone}
          onChange={(e) =>
            setEmployeeInfo({ ...EmployeeInfo, phone: e.target.value })
          }
          style={inputTextStyle} // Apply the style here
        />
      </label>
      <br />
      <label>
        Address:
        <input
          type="text"
          value={EmployeeInfo.address}
          onChange={(e) =>
            setEmployeeInfo({ ...EmployeeInfo, address: e.target.value })
          }
          style={inputTextStyle} // Apply the style here
        />
      </label>
      <br />
      <button style={{ backgroundColor: "blue", color: "white" }} type="submit">
        Submit
      </button>
    </form>
  );
}
