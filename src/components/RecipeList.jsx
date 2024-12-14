import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const RecipeList = ({ recipes }) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const fetchFavorites = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch("http://localhost:5000/api/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const favorites = await response.json();
          setFavoriteRecipes(favorites.map((fav) => String(fav.recipeId)));
        } else {
          console.error("Failed to fetch favorite recipes.");
        }
      } catch (error) {
        console.error("Error fetching favorite recipes:", error);
      }
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const likeRecipe = async (recipeId) => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ recipeId }),
    });
    if (response.ok) {
      alert("Recipe added to favorites");
      fetchFavorites();
    } else {
      alert("Error adding recipe to favorites");
    }
  };

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
  };

  if (!recipes || recipes.length === 0) {
    return (
      <h1 className="text-danger mt-2 mb-2 pt-2 text-center font-bold">
        No recipes found.
      </h1>
    );
  }

  return (
    <div className="container">
      <div className="row">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.description}</p>
                <div className="row">
                  <div className="col-6">
                    <button
                      className="btn btn-dark btn-sm mr-2"
                      onClick={() => openModal(recipe)}
                    >
                      View Recipe
                    </button>
                  </div>
                  <div className="col-6 text-end">
                    <button
                      className={`btn btn-${
                        favoriteRecipes.includes(String(recipe.id))
                          ? "dark"
                          : "danger"
                      } btn-sm`}
                      onClick={() => likeRecipe(recipe.id)}
                      disabled={favoriteRecipes.includes(String(recipe.id))}
                    >
                      {favoriteRecipes.includes(String(recipe.id))
                        ? "❤️ Favorited"
                        : "Add to Favorites"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedRecipe && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title m-2">{selectedRecipe.title}</h5>
              </div>
              <div className="modal-body">
                <div className="d-flex justify-content-center">
                  <img
                    src={selectedRecipe.image}
                    alt={selectedRecipe.title}
                    className="img-fluid mb-3"
                  />
                </div>
                <h4 className="text-center">
                  <strong>Ingredients:</strong>
                </h4>
                <ul>
                  {selectedRecipe.missedIngredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient.amount} {ingredient.unitShort}{" "}
                      {ingredient.name}
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <a
                    href={selectedRecipe.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-dark btn-sm mt-3 mb-2 p-2"
                  >
                    Go to Recipe Source
                  </a>
                </div>
              </div>
              <div className="modal-footer text-center">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeList;
