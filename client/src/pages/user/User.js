import React, { useContext } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { TravelsContext } from '../../context/TravelsContext'

import "./user.scss"

export const User = () => {
  const {user, travel} = useContext(TravelsContext);
  const navigate = useNavigate();

  return (
    <div>
      <h1 className='title'>Usuario</h1>
      <div className='mainUser'>
      
      <div><img src="" alt="" />Aqui va la imagen</div>
      <div>
        <p>Datos de usuario:</p>
        <h4>Nombre: {user?.name}</h4>
        {/* <h5>Apellidos: {user?.lastname}</h5> */}
        <h5>Correo: {user?.email}</h5>
        {/* <h5>Dirección: {user?.address}</h5>
        <h5>Teléfono: {user?.phone}</h5> */}
      </div>
      <div>
      {travel && <p>Viajes:</p>}
      {travel && <h4>{travel.name}</h4>}
      </div>
      <Button onClick={()=>navigate("/editUser")}>Editar Usuario</Button>
    </div>
    </div>

  )
}
