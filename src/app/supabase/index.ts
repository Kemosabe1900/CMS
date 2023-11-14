import { createClient } from "@supabase/supabase-js";
import { Note, Client } from "../types";
import add_Client from "../employeeForm";
// import { sign } from "crypto";

//function to save string to note table
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error(
    `Missing Supabase URL (${SUPABASE_URL}) or Key (${SUPABASE_KEY})`
  );
}
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

//Define the testNote object
const testNote: Note = {
  services: {
    dressing: false,
    grooming: true,
    bathing: false,
    eating: true,
    transfers: false,
    mobility: true,
    positioning: false,
    toileting: true,
    light_housekeeping: false,
    laundry: true,
    health_related_functions: false,
    behavior: true,
    other: true,
  },
  comments: "this is wild.",
};
export async function add_note(note: Note): Promise<boolean> {
  const { error, data } = await supabase.from("note").insert([note]).select();
  if (error || !data) {
    console.log("Error", error);
    return false;
  }
  return data.length > 0;
}

export async function test_add_client(clientInfo: Client): Promise<void> {
  try {
    //create a user in Supabase
    const signUpResult = await supabase.auth.signUp({
      email: clientInfo.email,
      password: "password",
    });

    if (signUpResult.error) {
      console.error("Error creating user: ", signUpResult.error.message);
      return;
    }

    console.log("User created!");

    //Add user into to client table
    const { data, error } = await supabase.from("client").upsert([
      {
        first_name: clientInfo.first_name,
        last_name: clientInfo.last_name,
        email: clientInfo.email,
        phone: clientInfo.phone,
        address: clientInfo.address,
      },
    ]);

    if (error) {
      console.error("Error adding user to clients table: ", error.message);
      return;
    }

    console.log("User added to client table: ", data);
  } catch (err) {
    console.error("Error with the request: ", err);
  }
}

const testClientInfo: Client = {
  first_name: "John",
  last_name: "Doe",
  email: "nahomabe167@gmail.com",
  phone: "1234567890", // Add a valid phone number
  address: "123 Main St, City, Country", // Add a valid address
};

// Call the test_add_client function with the testClientInfo
test_add_client(testClientInfo);
