import React, { useState } from "react";
import "../../sass/Card.scss";

const Card = ({ name, img, stats }) => {

  const baseXP = stats[0]
  const height = stats[1]
  const weight = stats[2]
  const types = stats[3]
  console.log(types)
  const [isFlipped, setIsFlipped] = useState(false);
  const [zIndex, setZIndex] = useState(1);
  const handleClick = () => {
    setIsFlipped(!isFlipped);
    setZIndex((prevZIndex) => prevZIndex + 1);
  };

  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""}`}
      onClick={handleClick}
      style={{ zIndex }}
    >
      <div className="front">
        <div className="card__circle"></div>
        <p className="card__name">{name}</p>
        <img className="card__image" src={img} alt="pokemon img" />
      </div>
      <div className="back">
        {/* Add information to display on the back of the card */}
        {/* For example: */}
        <p className="back__name">{name}</p>
        <div className="stats-container">
          <p>XP: {baseXP}</p>
          <p>Altura: {height}</p>
          <p>Peso: {weight}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
