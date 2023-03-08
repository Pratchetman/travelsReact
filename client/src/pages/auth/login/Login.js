import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { TravelsContext } from '../../../context/TravelsContext';
import { saveLocalStorageTravel } from '../../../helpers/localStorage/localStorageTravels';

import "./login.scss"


const loginDefault = {
email: "",
  password: ""
}
export const Login = () => {
const [login, setLogin] = useState(loginDefault);
const navigate = useNavigate();
const [message, setMessage] = useState("");
const {setUser, user, setLogged} = useContext(TravelsContext)

const handleChange = (e) =>{
  let {name, value} = e.target;
  setLogin({...login, [name]:value})
}

const handleSubmit = (e) =>{
  if (!login.email || !login.password){
    setMessage("Debes rellenar todos los campos");
  }else{
    axios
    .post("http://localhost:4000/users/login", login)
    .then((res)=>{
      saveLocalStorageTravel(res.data.token);
      setUser(res.data.user);
      const type = res.data.user.type;
      type === 0 ? navigate("/user") : type === 1 ? navigate("/admin") : navigate("/");
      setLogged(true);
    })
    .catch((err)=>console.log(err))
  }
  
}



  return (
    <div className='login'>
      <h3>Login</h3>
      <input type="text" name="email" placeholder='Introduce el email' value={login.email} onChange={handleChange}/>
      <input type="password" name="password" placeholder='Introduce la contraseña'  value={login.password} onChange={handleChange} />
      <Button onClick={handleSubmit}>Aceptar</Button>
      <p>{message}</p>
      <hr />
      <p>¿No estas registrado?</p>
      <Button onClick={()=>navigate("/register")}>Regístrate</Button>
    </div>
  )
}
