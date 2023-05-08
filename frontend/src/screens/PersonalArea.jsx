import React from "react";
import CardNews from "../components/CardNews/CardNews";


function PersonalArea(props) {

  
  return (
      <div className='personal-area'>
          <CardNews cnrole = {props.role} />
      </div>
  );
}

export default PersonalArea;
