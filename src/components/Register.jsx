import React, { useState } from "react";

const Register = ({ onRegister, setFormSwap }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Registration successful");
      onRegister();
    } else {
      alert("Registration failed: " + data.message);
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center item-center">
        <div className="col-12">
          <form onSubmit={handleSubmit}>
            <div className="row d-flex justify-content-center item-center">
              <div className="col-4  mt-2 mb-2 p-2">
                <input
                  className="form-control "
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
              </div>
              <div className="col-4  mt-2 mb-2 p-2">
                <input
                  className="form-control "
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="col-6  mt-2 mb-2 p-2">
                <input
                  className="form-control "
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <div className="col-2 text-end  mt-2 mb-2 p-2">
                <button className="btn btn-danger btn-sm  p-2 " type="submit">
                  Register
                </button>
              </div>

              <div className="col-8  mt-2 mb-2 p-2 text-end">
                <btn className="btn" onClick={() => setFormSwap(true)}>
                  Already registered, Login?
                </btn>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
