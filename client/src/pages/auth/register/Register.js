import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./register.scss";
const registerDefault = {
  name: "",
  email: "",
  password: "",
};
export const Register = () => {
  const [register, setRegister] = useState(registerDefault);
  const navigate = useNavigate();
  const [messageError, setMessageError] = useState("");

  const handleChange = (e) =>{
    let {name, value} = e.target;
    setRegister({...register, [name]:value});
  }

  const handleSubmit = () => {
    if (!register.email || !register.password || !register.name){
      setMessageError("Debes rellenar todos los campos");
    }
    else{
      axios
      .post("http://localhost:4000/users/createUser", register)
      .then((res)=>{console.log(res);navigate("/login")})
      .catch((err)=>{
        if(err.response.data.error.errno === 1062){
          setMessageError("Email duplicado");
        }else{
          setMessageError("Error en el registro");
        }
      })
    } 
   
  };

  return (
    <div className="register">
      <h3>Registro</h3>
      <input
        type="text"
        name="name"
        placeholder="Introduce tu nombre"
        vale={register.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="email"
        placeholder="Introduce el email"
        value={register.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Introduce la contraseña"
        value={register.password}
        onChange={handleChange}
      />
      <Button onClick={handleSubmit}>Aceptar</Button>
      <hr />
      <p>{messageError}</p>
      <p>Ya estas registrado?</p>
      <Button onClick={() => navigate("/login")}>LogIn</Button>
    </div>
  );
};
