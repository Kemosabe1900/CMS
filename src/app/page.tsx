"use client";
import Image from "next/image";
import { Note } from "./types";
import { add_note } from "./supabase";
export default function Home() {
  const note: Note = {
    client_id: "d0f67e95-4bc0-47d5-98d2-d21dbf4455e2",
    // servies:
  };
  return (
    <div>
      <button onClick={() => add_note(note)}>Add Note</button>
    </div>
  );
}
