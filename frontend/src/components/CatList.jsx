import React from "react";
import PropTypes from "prop-types";

function CatList({ cats, onDeleteCat }) {
  if (cats.length === 0) {
    return <p className="text-center text-gray-500">🐾 No cats available...</p>;
  }

  return (
    <div className="space-y-4">
      {cats.map((cat) => (
        <div
          key={cat.id}
          className="bg-white p-4 shadow-md rounded-lg flex justify-between items-center"
        >
          <div>
            <h2 className="text-xl font-semibold">{cat.name}</h2>
            <p className="text-gray-600">🕰️ {cat.age} years old</p>
            <p className="text-gray-600">🐾 Breed: {cat.breed}</p>
          </div>
          <button
            onClick={() => onDeleteCat(cat.id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            🗑️ Delete
          </button>
        </div>
      ))}
    </div>
  );
}

CatList.propTypes = {
  cats: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      breed: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteCat: PropTypes.func.isRequired,
};

export default CatList;
