import React from "react";
import "./CardNews.css";

function Card({ item }) {
  return (
    <div className="card-header">
      <div className="card-icon">
        <img src={`images/icons/${item.icon}`} alt="icon" />
      </div>
      <div className="card-name">
        <p>{item.name}</p>
      </div>
    </div>
  );
}

export default Card;
