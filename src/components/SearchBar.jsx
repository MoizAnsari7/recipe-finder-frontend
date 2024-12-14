import React, { useState } from "react";
import axios from "axios";

const SearchBar = ({ onSearch }) => {
  const [ingredient, setIngredient] = useState("");
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      console.log("this is me");

      const response = await axios.get("http://localhost:5000/api/recipes", {
        params: { ingredients: ingredient },
      });
      onSearch(response.data);
    } catch (error) {
      setError("Error fetching recipes. Please try again later.");
      setIngredient("");
      onSearch("");
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div className="m-4 pt-2 mb-5">
      <form onSubmit={handleSearch}>
        <div className="d-flex justify-content-center items-center ">
          <input
            className="text-danger form-control"
            type="text"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            placeholder="Enter ingredient"
          />
          <button className="btn btn-lg  btn-danger mx-4" type="submit">
            Search
          </button>
        </div>
      </form>
      {error && (
        <p className="text-danger mt-3 mb-2 pt-1 text-center">{error}</p>
      )}
    </div>
  );
};

export default SearchBar;
