"use client";
import { Note } from "../types";
import { add_note } from "@/app/supabase";
import { useState } from "react";
// import NewEmployee from "../employeeForm";

export default function Home() {
  const [comment, setComment] = useState("");

  const [note, setNote] = useState<Note>({
    employee_id: "d3e3ac67-4fd5-4a37-9d10-be0b73406a9f",
    client_id: "fae14744-61ed-491d-a793-3b45f9c2ee29",
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
  });

  const handleCheckboxChange = (name: string, isChecked: boolean) => {
    setNote((prevNote) => ({
      ...prevNote,
      services: {
        ...prevNote.services,
        [name]: isChecked,
      },
      other_comment: comment,
    }));
  };

  const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote((prevNote) => ({
      ...prevNote,
      services: {
        ...prevNote.services,
        other: e.target.checked,
      },
      other_comment: comment,
    }));
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
    setNote((prevNote) => ({
      ...prevNote,
      services: {
        ...prevNote.services,
        other_comment: e.target.value,
      },
    }));
    console.log("Comment:", e.target.value);
  };
  const handlesubmit = async () => {
    const result = await add_note(note);
  };
  return (
    <div>
      {/* Add Note button */}
      <button
        style={{ backgroundColor: "blue", color: "white" }}
        onClick={handlesubmit}
      >
        Submit form
      </button>
      {/* checklist items */}
      <ul>
        <li>
          <label>
            <input
              type="checkbox"
              checked={note.services.dressing}
              onChange={(e) =>
                handleCheckboxChange("dressing", e.target.checked)
              }
            />
            Dressing
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={note.services.grooming}
              onChange={(e) =>
                handleCheckboxChange("grooming", e.target.checked)
              }
            />
            Grooming
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={note.services.bathing}
              onChange={(e) =>
                handleCheckboxChange("bathing", e.target.checked)
              }
            />
            Bathing
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={note.services.eating}
              onChange={(e) => handleCheckboxChange("eating", e.target.checked)}
            />
            Eating
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={note.services.transfers}
              onChange={(e) =>
                handleCheckboxChange("transfers", e.target.checked)
              }
            />
            Transfers
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={note.services.mobility}
              onChange={(e) =>
                handleCheckboxChange("mobility", e.target.checked)
              }
            />
            Mobility
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={note.services.positioning}
              onChange={(e) =>
                handleCheckboxChange("positioning", e.target.checked)
              }
            />
            Positioning
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={note.services.toileting}
              onChange={(e) =>
                handleCheckboxChange("toileting", e.target.checked)
              }
            />
            Toileting
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={note.services.light_housekeeping}
              onChange={(e) =>
                handleCheckboxChange("light_housekeeping", e.target.checked)
              }
            />
            Light Housekeeping
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={note.services.laundry}
              onChange={(e) =>
                handleCheckboxChange("laundry", e.target.checked)
              }
            />
            Laundry
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={note.services.health_related_functions}
              onChange={(e) =>
                handleCheckboxChange(
                  "health_related_functions",
                  e.target.checked
                )
              }
            />
            Health-Related Functions
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={note.services.behavior}
              onChange={(e) =>
                handleCheckboxChange("behavior", e.target.checked)
              }
            />
            Behavior
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={note.services.other}
              onChange={handleOtherChange}
            />
            Other
          </label>
        </li>
        <li>
          {note.services.other && (
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
      <br />
    </div>
  );
}
