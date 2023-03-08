import axios from "axios";
import React, { useEffect, useState } from "react";

import "./gallery.scss";

export const Gallery = ({ elem, files }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/travels/getImgs/${elem.travel_id}`)
      .then((res) => {
        setImages(res.data);
      })

      .catch((error) => console.log(error));
  }, [files]);

  const delPhoto = (id) =>{
    let newImages = images.filter((elem)=> id !== elem.photo_id)
    

    axios
    .put(`http://localhost:4000/travels/delPhoto/${id}`)
    .then((res)=>{
      setImages(newImages);
    })
    .catch((err)=>console.log(err));
  }

  return (
    <div>
      
        <div className="rowTravelImg">

      
      {images?.map((elem, index) => {
        return (
          <div key={index}>
            <button className="basura" onClick={()=>{delPhoto(elem.photo_id)}}>🗑</button>
            <img className="travelImageSm" src={`./images/travel/${elem.photo_name}`} alt="" />
          </div>
        );
      })}
        </div>
    </div>
  );
};
