import React, { useState } from "react";

const Login = ({ onLogin, setIsLoggedIn, setFormSwap }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        onLogin();
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred while logging in.");
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center item-center">
        <div className="col-12">
          <form onSubmit={handleSubmit}>
            <div className="row d-flex justify-content-center item-center">
              <div className="col-8  mt-2 mb-2 p-2">
                <input
                  className="form-control "
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
              </div>
              <div className="col-7 mt-2 mb-2 p-2">
                <input
                  className="form-control "
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>

              <div className="col-1  mt-2 mb-2 p-2 text-end">
                <button className="btn btn-danger btn-sm  p-2 " type="submit">
                  Login
                </button>
              </div>
              <div className="col-8  mt-2 mb-2 p-2 text-end">
                <btn className="btn" onClick={() => setFormSwap(false)}>
                  Not registered, Do signup?
                </btn>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
