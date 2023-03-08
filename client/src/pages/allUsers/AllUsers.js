import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TravelsContext } from '../../context/TravelsContext'

import "./allUsers.scss";

export const AllUsers = () => {
  const {user, token, setOneTravel} = useContext(TravelsContext)
  const [allTravels, setAllTravels] = useState([])
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
    .get("http://localhost:4000/users/allUser")
    .then((res)=>{
      setAllTravels(res.data);
    })
    .catch((error)=>console.log(error));
  }, [token])

  const handleTravel = (elem) => {
    setOneTravel(elem)
    console.log(elem)
    navigate("/travels")
  }
  
  return (
    <>
    <h1>Todos los viajes de nuestros usuarios</h1>
   
    <div className='flex'>
      
      {allTravels && allTravels.map((elem, index)=>{
        return (
          <div className='cardTravel' key={index} onClick={()=>handleTravel(elem)}>
            <p>Ciudad: {elem.city}</p>
            <p>{elem.description}</p>
            <img src={`/images/travel/${elem.photo_name}`} alt="" />
            <p>Usuario: {elem.name} {elem.lastname}</p>
          </div>
        )
      })}
    </div>
    </>
  )
}
