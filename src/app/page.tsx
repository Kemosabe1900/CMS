"use client";
import Image from "next/image";
import { Note, Services } from "./types";
import { add_note } from "./supabase";
import { useState } from "react";
export default function Home() {
  const [comment, setComment] = useState("");

  const note: Note = {
    client_id: "d0f67e95-4bc0-47d5-98d2-d21dbf4455e2",
    services: {
      dressing: false,
      grooming: false,
      bathing: false,
      eating: false,
      transfers: false,
      mobility: false,
      positioning: false,
      toileting: false,
      light_housekeeping: false,
      laundry: false,
      health_related_functions: false,
      behavior: false,
      other: false,
      other_comment: comment,
    },
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  return (
    <div>
      {/* Add Note button */}
      <button onClick={() => add_note(note)}>Add Note</button>
      {/* checklist items */}
      <ul>
        <li>
          <label>
            <input
              type="checkbox"
              checked={note.services?.dressing}
              // onChange={(e) => handleDressingChange(e.target.checked)}
            />
            Dressing
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={note.services?.grooming}
              onChange={(e) => {
                /* handle checkbox change */
              }}
            />
            Grooming
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={note.services?.bathing}
              onChange={(e) => {
                /* handle checkbox change */
              }}
            />
            Bathing
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={note.services?.eating}
              onChange={(e) => {
                /* handle checkbox change */
              }}
            />
            Eating
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={note.services?.transfers}
              onChange={(e) => {
                /* handle checkbox change */
              }}
            />
            Transfers
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={note.services?.mobility}
              onChange={(e) => {
                /* handle checkbox change */
              }}
            />
            Mobility
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={note.services?.light_housekeeping}
              onChange={(e) => {
                /* handle checkbox change */
              }}
            />
            Light Housekeeping
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={note.services?.laundry}
              onChange={(e) => {
                /* handle checkbox change */
              }}
            />
            Laundry
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={note.services?.health_related_functions}
              onChange={(e) => {
                /* handle checkbox change */
              }}
            />
            Health-Related Functions
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={note.services?.behavior}
              onChange={(e) => {
                /* handle checkbox change */
              }}
            />
            Behavior
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={note.services?.other}
              onChange={(e) => {
                /* handle checkbox change */
              }}
            />
            Other
          </label>
        </li>
        <li>
          {note.services?.other && (
            <div>
              <label>
                Other comments:
                <input
                  type="text"
                  value={comment}
                  onChange={handleCommentChange}
                />
              </label>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}
