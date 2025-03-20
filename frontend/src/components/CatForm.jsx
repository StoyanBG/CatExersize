import React, { useState } from "react";
import PropTypes from "prop-types";

function CatForm({ onAddCat }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !age || !breed) {
      alert("Please fill in all fields.");
      return;
    }
    onAddCat({ name, age: parseInt(age), breed });
    setName("");
    setAge("");
    setBreed("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 shadow-lg rounded-lg mb-6"
    >
      <input
        type="text"
        placeholder="Cat's Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full rounded-md mb-2"
      />
      <input
        type="number"
        placeholder="Age (years)"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="border p-2 w-full rounded-md mb-2"
      />
      <input
        type="text"
        placeholder="Breed"
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
        className="border p-2 w-full rounded-md mb-4"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-600"
      >
        ➕ Add Cat
      </button>
    </form>
  );
}

CatForm.propTypes = {
  onAddCat: PropTypes.func.isRequired,
};

export default CatForm;
