import React from "react";
import "./App.css";
import ManageCustomer from "./components/ManageCustomer";

function App() {
  return (
    <div className="App">
      <h1 style={{ backgroundColor: "blue", color: "white" }}>
        Manage Customer{" "}
      </h1>

      <ManageCustomer />
    </div>
  );
}

export default App;
