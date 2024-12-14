import React, { useEffect, useState } from "react";

const FavoriteRecipes = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:5000/api/favorites/details",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.table( data);
          setFavorites(data);
        } else {
          setError("Error fetching favorite recipes");
        }
      } catch (err) {
        setError("Error fetching favorite recipes");
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Your Favorite Recipes</h1>
      <div className="row">
        {favorites.map((recipe) => (
          <div className="col-md-4 mb-4" key={recipe.id}>
            <div className="card">
              <img
                src={recipe.image}
                className="card-img-top"
                alt={recipe.title}
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.summary}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteRecipes;
