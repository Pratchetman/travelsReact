import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Carrusel } from "../../components/Carousel";
import { TravelsContext } from "../../context/TravelsContext";

import "./travel.scss";

export const Travel = () => {
  const { oneTravel } = useContext(TravelsContext);
  console.log(oneTravel);

  return (
    <div className="fondoTravel">
      <div className="rowOneTravel">
        <div className="oneTravelUser">
          <p><span>Datos de usuario:</span> </p>
          <div className="flex">
          <img src={`./images/user/${oneTravel.img}`} alt="" />
          <div><h6>{oneTravel.name} {oneTravel.lastname}</h6>
            <h6>{oneTravel.email}</h6>
            <h6>{oneTravel.phone}</h6>
            <h6>{oneTravel.address}</h6>
          </div>
          </div>
          
        </div>
        <div className="oneTravelTravel">
          <p><span> Datos del viaje:</span></p>
          <p>Ciudad: <span>{oneTravel.city}</span></p>
          <p>País: <span>{oneTravel.country}</span></p>
          <p>Descripción: <span>{oneTravel.description}</span></p>
        </div>
      </div>
      <Carrusel />
    </div>
  );
};
