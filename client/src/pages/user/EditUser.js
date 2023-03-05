import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { TravelsContext } from '../../context/TravelsContext'

import "./editUser.scss";

const initialValue = {
  name: "",
  lastname: "",
  address: "",
  phone: ""
}

export const EditUser = () => {
  const [editUser, setEditUser] = useState(initialValue)
  const {user, setUser, travel} = useContext(TravelsContext);
  const [file, setFile] = useState()

  const navigate = useNavigate();

  useEffect(() => {
    if(user){
      setEditUser(user)
    }
  }, [user])
  
  const handleChange = (e) =>{
    let {name, value} = e.target;
    setEditUser({...editUser, [name]:value});
  }

  const handleChangeFile = (e) =>{
    setFile(e.target.files[0]);
  }

  const handleSubmit = () =>{
    const newFormData = new FormData();
    newFormData.append("file", file);
    newFormData.append("register", JSON.stringify(editUser));

    axios
    .put(`http://localhost:4000/users/editUser/${user.user_id}`, newFormData)
    .then((res)=>{
      setUser(editUser);
      navigate("/user");
    })
    .catch((err)=>console.log(err));
  }



  return (
    <div>
    <h1 className='title'>Editar usuario</h1>
    {user && <div className='mainUser'>
    <div><img src="" alt="" />Aqui va la imagen</div>
    <div>
      <p>Datos de usuario:</p>
      <input type="text" onChange={handleChange} name="name" value={editUser.name} />
      <input type="text" placeholder='Apellidos' name="lastname" value={editUser.lastname}  onChange={handleChange} />
      <input type="text" placeholder='Dirección' name="address" value={editUser.address}  onChange={handleChange}/>
      
      <input type="number" name="phone" placeholder='Teléfono' value={editUser.phone}  onChange={handleChange} />
      
    </div>
    <label>Cambiar Imagen</label>
    <input type="file" onChange={handleChangeFile} />
    <Button onClick={handleSubmit}>Enviar</Button>
    <Button onClick={()=>navigate(-1)}>Cancelar</Button>
    </div>}
    
  </div>
  )
}
