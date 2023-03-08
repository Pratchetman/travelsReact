import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import { TravelsContext } from '../context/TravelsContext';

import "./newTravel.scss"

const travelInitial = {
    city: "",
    country: "",
    description: ""
}

export const NewTravel = ({setShowNewTravels}) => {
    const [newTravel, setNewTravel] = useState(travelInitial);
    const [files, setFiles] = useState([]);
    const {user, setTravel, travel} = useContext(TravelsContext);
    // const navigate = useNavigate();
    console.log(travel);
    let handleChange = (e) =>{
        let {name, value} = e.target;
        setNewTravel({...newTravel, [name]:value})
    }

    let handleFiles = (e) =>{
        setFiles(e.target.files);
    }

    let handleSubmit = (e) =>{
        const newFormData = new FormData();

        newFormData.append("files", files);
        if(files){
            for (const elem of files){
                newFormData.append("file", elem);
            }
        };
        newFormData.append("regTravel", JSON.stringify(newTravel));
    
        axios
        .post(`http://localhost:4000/travels/createTravel/${user.user_id}`, newFormData)
        .then((res)=>{
            console.log(res);
            setTravel(res.data);
            setShowNewTravels(false);
        })
        .catch((err)=>console.log(err));
    }
  return (
    <div>
      <h3>Nuevo viaje</h3>
      <input
        type="text"
        name="city"
        placeholder="Ciudad"
        vale={newTravel.city}
        onChange={handleChange}
      />
      <input
        type="text"
        name="country"
        placeholder="País"
        value={newTravel.country}
        onChange={handleChange}
      />
      <input type="text" name="description" placeholder="Añade una descripción" onChange={handleChange} value={newTravel.description} />
      <h5>Fotos</h5>
      <input
        type="file"
        name="file"
        multiple
        onChange={handleFiles}
        
      />
     
      <Button className='botonesTravel' onClick={handleSubmit}>Aceptar</Button>
      <Button className='botonesTravel' onClick={()=>setShowNewTravels(false)}>Cancelar</Button>
    </div>
  )
}
