import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import Register from "./components/Register";
import Login from "./components/Login";
import FavoriteRecipes from "./components/FavoriteRecipes";

function App() {
  const [recipes, setRecipes] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formSwap, setFormSwap] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const handleToggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setFormSwap(false);
  };

  const handleRegister = () => {
    setFormSwap(false);
  };

  const handleSearch = (data) => {
    setRecipes(data);
  };

  const checkSession = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        console.log("Token Decoded:", decoded);
        console.log(
          `Token Expiry: ${decoded.exp}, Current Time: ${currentTime}`
        );

        if (decoded.exp || decoded.exp < currentTime) {
          console.log("Token has expired. Removing token...");
          localStorage.removeItem("token");
          alert("Session expired, please log in again.");
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
      }
    }
  };

  useEffect(() => {
    checkSession();
    const intervalId = setInterval(checkSession, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {isLoggedIn && (
        <>
          <div className="row d-flex justify-content-between align-items-center">
            <div className="col-6 text-start">
              <button
                className="btn btn-md p-2 m-2 btn-dark"
                onClick={handleToggleFavorites}
              >
                {showFavorites ? "Hide Favorites" : "Show Favorites"}
              </button>
            </div>

            <div className="col-6 text-end">
              <button
                className="btn btn-md p-2 m-2 btn-dark"
                onClick={() => {
                  setIsLoggedIn(false);
                  localStorage.removeItem("token");
                }}
              >
                Logout
              </button>
            </div>

            <div className="col-12 mt-4">
              {showFavorites && <FavoriteRecipes />}
            </div>
          </div>

          <h1 className="text-center m-2 pt-3 font-bold">Recipe Finder</h1>
          <div className="col-12">
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className="col-12">
            <RecipeList recipes={recipes} />
          </div>
        </>
      )}

      <div className="App d-flex justify-content-center align-items-center vh-100">
        {!isLoggedIn && !formSwap ? (
          <Register onRegister={handleRegister} setFormSwap={setFormSwap} />
        ) : (
          ""
        )}

        {!isLoggedIn && formSwap ? (
          <Login
            onLogin={handleLogin}
            setIsLoggedIn={setIsLoggedIn}
            setFormSwap={setFormSwap}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
