import React from "react";
import { format } from "date-fns";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-title">
        Сайт НТИ (филиал) УРФУ {format(new Date(), "yyyy")}
      </div>
    </footer>
  );
}

export default Footer;
