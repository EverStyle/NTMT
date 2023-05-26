import React, { useState } from "react";
import Card from "./Card";
import cards from "./json";
import admincards from "./adminjson";
import teachercards from "./teacherjson";
import "./CardNews.css";
import { Link } from "react-router-dom";

function CardNews(props) {
  const path = window.location.pathname.substring(1);
  const [activeCard, setActiveCard] = useState(path);
  {
    switch (parseInt(props.cnrole)) {
      case 1:
        return <>
        <div className="cards ">
          {admincards.map((item) => (
            <Link
              to={`${item.route}`}
              onClick={() => setActiveCard(item.route)}
              key={item.name}
              className={`card ${activeCard === item.route && "active"}`}
            >
              <Card item={item} />
            </Link>
          ))}
        </div>
      </>;
      case 3:
        return <>
          <div className="cards ">
            {teachercards.map((item) => (
              <Link
                to={`${item.route}`}
                onClick={() => setActiveCard(item.route)}
                key={item.name}
                className={`card ${activeCard === item.route && "active"}`}
              >
                <Card item={item} />
              </Link>
            ))}
          </div>
        </>;
      default:
        return <>
          <div className="cards ">
            {cards.map((item) => (
              <Link
                to={`${item.route}`}
                onClick={() => setActiveCard(item.route)}
                key={item.name}
                className={`card ${activeCard === item.route && "active"}`}
              >
                <Card item={item} />
              </Link>
            ))}
          </div>
        </>;
    }
  }




  return (
    <>
      <div className="cards ">
        {cards.map((item) => (
          <Link
            to={`${item.route}`}
            onClick={() => setActiveCard(item.route)}
            key={item.name}
            className={`card ${activeCard === item.route && "active"}`}
          >
            <Card item={item} />
          </Link>
        ))}
      </div>
    </>
  );
}

export default CardNews;
