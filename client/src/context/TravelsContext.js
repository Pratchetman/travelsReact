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

  useEffect(() => {
    const token = getLocalStorageTravel();
    if (token) {
      const tokDec = jwt_decode(token).user;
      axios
      .get(`http://localhost:4000/users/oneUser/${tokDec.id}`)
      .then((res)=>{setUser(res.data.resultUser[0]);
      setTravel(res.data.resultTravel)})
      .catch((error)=>console.log(error));
    }
    
  }, [setUser]);

  return (
    <TravelsContext.Provider value={{ user, setUser, travel, setTravel }}>
      {props.children}
    </TravelsContext.Provider>
  );
};
