
import React, { useContext, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { EditTravelModal } from '../../components/EditTravelModal';

import { NewModalTravel } from '../../components/NewTravelModal';
import { ShowAllTravels } from '../../components/ShowAllTravels';
import { TravelsContext } from '../../context/TravelsContext';


import "./user.scss"

export const User = () => {
  const {user, travel} = useContext(TravelsContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);

 
  
  
  return (
    <div>
      <h1 className='title'>Usuario</h1>
      <div className='mainUser'>
      <div className="rowUser">
      <div className='imagenPerfil'><img src={`./images/user/${user?.img}`} alt="" /></div>
      <div>
        <p>Datos de usuario:</p>
        <h4>{user?.name}</h4>
        <h5>{user?.lastname}</h5>
        <h5>{user?.email}</h5>
        <h5>Dirección: {user?.address}</h5>
        <h5>Teléfono: {user?.phone}</h5>
      </div>
      </div>
    <Button className="buttonWidth" onClick={()=>navigate("/editUser")}>Editar Usuario</Button>
    </div>
    <div className='viajes'>
      <h1 className='title'>Viajes</h1>
      <div className='botonNuevoViaje'>
      <Button  onClick={()=>setShow(!show)}>Añadir viajes</Button>
      </div>
      
    <NewModalTravel show = {show} setShow = {setShow} />
    <ShowAllTravels />
   
    </div>
    </div>

  )
}
