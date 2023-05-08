import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

function File({ file, onClick }) {
  return (
    <div className="file-link" onClick={onClick}>
      <img src='./images/file.png' alt='1' />
      <p>{file.fileName}</p>
    </div>
  );
}

export default File;
