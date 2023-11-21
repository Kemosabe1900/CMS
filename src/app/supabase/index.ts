import { createClient } from "@supabase/supabase-js";
import { Note, Employee } from "../types";
import { Fascinate } from "next/font/google";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error(
    `Missing Supabase URL (${SUPABASE_URL}) or Key (${SUPABASE_KEY})`
  );
}
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function add_note(note: Note): Promise<boolean> {
  const { error, data } = await supabase.from("note").insert([note]).select();
  if (error || !data) {
    console.log("Error", error);
    return false;
  }
  return data.length > 0;
}

export async function add_employee(employeeInfo: Employee): Promise<boolean> {
  try {
    //employee alreayd exitsts check
    const { data: existingEmployee, error: existingEmployeeError } =
      await supabase.from("client").select("*").eq("email", employeeInfo.email);

    if (existingEmployeeError) {
      console.error(
        "error checking existing employee",
        existingEmployeeError.message
      );
      return false;
    }

    // If the employee already exists, display a message and return false
    if (existingEmployee && existingEmployee.length > 0) {
      console.log("Employee already exists");

      alert("Employee already exists in database."); //alert to show
      return false;
    }

    //create a user in Supabase
    const signUpResult = await supabase.auth.signUp({
      email: employeeInfo.email,
      password: "password",
    });

    if (signUpResult.error) {
      console.error("Error creating user: ", signUpResult.error.message);
    }

    console.log("User created!");

    //Add user into to client table
    const { data, error } = await supabase.from("client").upsert([
      {
        first_name: employeeInfo.first_name,
        last_name: employeeInfo.last_name,
        email: employeeInfo.email,
        phone: employeeInfo.phone,
        address: employeeInfo.address,
      },
    ]);

    if (error) {
      console.error("Error adding user to clients table: ", error.message);
    }

    console.log("User added to client table: ", data);

    //Send recovery email to new employee
    const { error: recoveryEmailError } =
      await supabase.auth.resetPasswordForEmail(employeeInfo.email);
    if (recoveryEmailError) {
      console.error(
        "Error initiating passowrd rest: ",
        recoveryEmailError.message
      );
      return false;
    }
    console.log("Passoword reset initiated successfully!!!");
  } catch (err) {
    console.error("Error with the request: ", err);
    return false;
  }
  return true;
}
