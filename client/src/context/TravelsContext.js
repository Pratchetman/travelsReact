import React, { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { getLocalStorageTravel } from "../helpers/localStorage/localStorageTravels";
import axios from "axios";

export const TravelsContext = createContext();

const initialUser = {
  name: "",
  lastname: "",
  address: "",
  phone: "",
  img: ""
}

export const TravelsProvider = (props) => {
  const [user, setUser] = useState(initialUser);
  const [travel, setTravel] = useState();
  const [logged, setLogged] = useState(false);
  const [token, setToken] = useState();
  const [oneTravel, setOneTravel] = useState();
  
  
  useEffect(() => {
    const token = getLocalStorageTravel();
    if (token) {
      setToken(token);
      const tokDec = jwt_decode(token).user;
      axios
      .get(`http://localhost:4000/users/oneUser/${tokDec.id}`)
      .then((res)=>{setUser(res.data.resultUser[0]);
      setTravel(res.data.resultTravel);
      setLogged(true)})
      
      .catch((error)=>console.log(error));
      
    }
    
  }, [logged]);

  return (
    <TravelsContext.Provider value={{ user, setUser, travel, setTravel, logged, setLogged, token, setToken, setOneTravel, oneTravel }}>
      {props.children}
    </TravelsContext.Provider>
  );
};
