import React, { useState, useEffect } from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";
import SalaryCalculator from "./SalaryCalculator"; // Looks in src folder
import LeaveTracker from "./LeaveTracker";       // Looks in src folder

const API =
process.env.NODE_ENV === "development"
? "http://localhost:5000/api/users"
: "/api/users";

// const API = "http://localhost:5000/api/users";
// const API = "/api/users";
// if (process.env.REACT_APP_ENV === 'development') {
//   console.log('Running in development');
//    const API = "http://localhost:5000/api/users";
// } else if (process.env.REACT_APP_ENV === 'production') {
//   console.log('Running in production');
//    const API = "/api/users";
// }

// const API = process.env.REACT_APP_API_BASE ? `${process.env.REACT_APP_API_BASE}/api/users` : "/api/users";
// const API = process.env.REACT_APP_API_BASE ? "/api/users" : "http://localhost:5000/api/users";

// const API = `${process.env.REACT_APP_API_BASE}/users`;
// const BASE_URL = process.env.REACT_APP_API_BASE;
// const API = `${BASE_URL}/users`;
// const API = process.env.REACT_APP_API_BASE || "/api/users";
// const API = "http://localhost:5000/api/users" || "/api/users";
// const API = process.env.REACT_APP_API_URL || "/api/users";

console.log("Current API URL:", API);

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditing] = useState(null);
  const [message, setMessage] = useState("");
  const [msgColor, setMsgColor] = useState("green");

  // State handles switching tabs ("users", "salary", or "leaves")
  const [activeTab, setActiveTab] = useState("users");

  const loadUsers = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      showMsg('Cannot connect to backend. Is "dotnet run" running?', "red");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const showMsg = (text, color = "green") => {
    setMsgColor(color);
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSave = async (formData) => {
    try {
      const method = editingUser ? "PUT" : "POST";
      const url = editingUser ? `${API}/${editingUser.id}` : API;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        showMsg(editingUser ? "User updated successfully!" : "User registered successfully!");
        setEditing(null);
        loadUsers();
      } else {
        showMsg("Save failed.", "red");
      }
    } catch {
      showMsg("Error connecting to API", "red");
    }
  };

  const handleEdit = (user) => {
    setEditing(user);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (res.ok) showMsg("User deleted.");
      else showMsg("Delete failed.", "red");
      loadUsers();
    } catch {
      showMsg("Delete failed.", "red");
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "30px auto", fontFamily: "Arial", padding: "0 20px" }}>

      {/* TAB BUTTON INTERFACE NAVIGATION BAR */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setActiveTab("users")} style={{ padding: "10px 15px", cursor: "pointer", backgroundColor: activeTab === "users" ? "#1F4E79" : "#e0e0e0", color: activeTab === "users" ? "white" : "black", border: "none", borderRadius: "4px" }}>
          User Management
        </button>
        <button onClick={() => setActiveTab("salary")} style={{ padding: "10px 15px", cursor: "pointer", backgroundColor: activeTab === "salary" ? "#1F4E79" : "#e0e0e0", color: activeTab === "salary" ? "white" : "black", border: "none", borderRadius: "4px" }}>
          Salary Calculations
        </button>
        <button onClick={() => setActiveTab("leaves")} style={{ padding: "10px 15px", cursor: "pointer", backgroundColor: activeTab === "leaves" ? "#1F4E79" : "#e0e0e0", color: activeTab === "leaves" ? "white" : "black", border: "none", borderRadius: "4px" }}>
          Overtime & Leaves Tracker
        </button>
      </div>

      {/* VIEW TAB 1: ORIGINAL USER DEMO */}
      {activeTab === "users" && (
        <div>
          <h1 style={{ borderBottom: "2px solid #1F4E79", paddingBottom: "10px", color: "#1F4E79" }}>User Registration — CRUD Demo 751 online 29 ....</h1>
          {message && <p style={{ color: msgColor, border: `1px solid ${msgColor}`, padding: "10px", borderRadius: "4px", background: msgColor === "green" ? "#f0fff0" : "#fff0f0" }}>{message}</p>}
          <UserForm editingUser={editingUser} onSave={handleSave} onCancel={() => setEditing(null)} />
          <hr style={{ margin: "30px 0", borderColor: "#1F4E79" }} />
          <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      )}

      {/* VIEW TAB 2: SALARY CALCULATOR */}
      {activeTab === "salary" && (
        <div>
          <h1 style={{ borderBottom: "2px solid #1F4E79", paddingBottom: "10px", color: "#1F4E79" }}>Salary Calculation System</h1>
          <SalaryCalculator />
        </div>
      )}

      {/* VIEW TAB 3: NEW LEAVE & OVERTIME TRACKER */}
      {activeTab === "leaves" && (
        <div>
          <h1 style={{ borderBottom: "2px solid #1F4E79", paddingBottom: "10px", color: "#1F4E79" }}>Leave and Overtime Logger</h1>
          <LeaveTracker />
        </div>
      )}

    </div>
  );
}

export default App;