import { createClient } from "@supabase/supabase-js";
import { Note } from "../types";

//function to save string to note table
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error(
    `Missing Supabase URL (${SUPABASE_URL}) or Key (${SUPABASE_KEY})`
  );
}
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function add_note(note: Note): Promise<boolean> {
  const { error, data } = await supabase.from("note").insert([note]).select();
  if (error || !data) {
    console.log("Error", error);
    return false;
  }
  return data.length > 0;
}
