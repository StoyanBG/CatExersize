import React, { useState, useEffect } from "react";
import axios from "axios";
import CatForm from "./components/CatForm";
import CatList from "./components/CatList";

function App() {
  const [cats, setCats] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/cats")
      .then((response) => {
        setCats(response.data);
      })
      .catch((error) => {
        setError("Error fetching cats: " + error.message);
      });
  }, []);

  const addCat = (cat) => {
    axios
      .post("http://localhost:3000/cats", cat)
      .then((response) => {
        setCats([...cats, response.data]);
      })
      .catch((error) => {
        setError("Error adding cat: " + error.message);
      });
  };

  const deleteCat = (id) => {
    axios
      .delete(`http://localhost:3000/cats/${id}`)
      .then(() => {
        setCats(cats.filter((cat) => cat.id !== id));
      })
      .catch((error) => {
        setError("Error deleting cat: " + error.message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        🐱 Cat Manager 3000
      </h1>

      {error && (
        <p className="text-center text-red-500 mb-4">
          {error}
        </p>
      )}

      <CatForm onAddCat={addCat} />
      <CatList cats={cats} onDeleteCat={deleteCat} />
    </div>
  );
}

export default App;
