import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { TravelsContext } from "../context/TravelsContext";

import "./carousel.scss";

export const Carrusel = () => {
    const { oneTravel } = useContext(TravelsContext);
    const [photos, setPhotos] = useState()
    useEffect(() => {
        axios
          .get(`http://localhost:4000/travels/getTravelPhotos/${oneTravel?.travel_id}`)
          .then((res) => {
            
            setPhotos(res.data.resultPhotos);
          })
          .catch((error) => console.log(error));
      }, []);
  return (
    <Carousel variant="dark" className="carrusel" >
        {photos?.map((elem, index)=>{
            return (
                <Carousel.Item className="carruselInt" key={index}>
                <img
                  className="d-block w-100"
                  src={`./images/travel/${elem.photo_name}`}
                  alt=""
                />
               
              </Carousel.Item>
            )
        })}
       
    </Carousel>
  );
};
