import { useState } from "react";
import { Client } from "./types";
import { supabase } from "./supabase";

export default function SignUp() {
  const [client, setClient] = useState<Client>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
  });
  const handleSignUp = async () => {
    try {
      const { data, error } = await supabase.from("client").insert([client]);
      if (error) throw error;
      console.log("Client details:", data);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div>
      {/* Your signup form JSX here */}
      <h2>Sign Up</h2>
      <div>
        <label>First Name</label>
        <input
          type="text"
          value={client.first_name}
          onChange={(e) => setClient({ ...client, first_name: e.target.value })}
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          value={client.last_name}
          onChange={(e) => setClient({ ...client, last_name: e.target.value })}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={client.email}
          onChange={(e) => setClient({ ...client, email: e.target.value })}
        />
      </div>
      <div>
        <label>Phone</label>
        <input
          type="text"
          value={client.phone}
          onChange={(e) => setClient({ ...client, phone: e.target.value })}
        />
      </div>
      <div>
        <label>Address</label>
        <input
          type="text"
          value={client.address}
          onChange={(e) => setClient({ ...client, address: e.target.value })}
        />
      </div>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}
