import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

function Folder({ folder }) {
  return (
    <Link to='sads' className="folder-link">
      <img src='./images/folder.png' alt='1' />
      <p>{folder.nameFolder}</p>
    </Link>
  );
}

export default Folder;
