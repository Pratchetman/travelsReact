
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { TravelsContext } from '../context/TravelsContext'
import { EditTravelModal } from './EditTravelModal'
import { Gallery } from './Gallery'

import "./showAllTravels.scss"


export const ShowAllTravels = () => {
const {travel, setTravel} = useContext(TravelsContext)
const [editShow, setEditShow] = useState(false);
const [travelToEdit, setTravelToEdit] = useState();
const [addImages, setAddImages] = useState(true);
const [files, setFiles] = useState([])

const handleDel = (elem) =>{
  
  let arrayProv = travel.filter((e)=>{
    return e.travel_id !== elem.travel_id;
  });

  axios
  .put(`http://localhost:4000/travels/delTravel/${elem.travel_id}`)
  .then((res)=>{  
    setTravel(arrayProv);
  })
  .catch((error)=>console.log(error));
  
}

const openModal = (elem) =>{
  setEditShow(true);
  setTravelToEdit(elem)
}

const handleFiles = (e) =>{
  setFiles(e.target.files);
}

const handleSubmit = (elem) => {
  
  const newFormData = new FormData();

  newFormData.append("files", files);
  if(files){
    for (let elem of files){
      newFormData.append("file", elem)
    }
  };

  axios
    .put(`http://localhost:4000/travels/addImgs/${elem.travel_id}`, newFormData)
    .then((res)=>{
      // setFiles([]);
      setAddImages(true);
    })
    .catch((err)=>console.log(err));
}

 return (
    <div>
      {travel?.map((elem,index)=>{
        return (
          <div className='oneViaje' key={index}>
            <h3 className='textOneViaje'>{elem.city}</h3>
            <div className='textOneViaje'>
            
            <h6>Pais: {elem.country}</h6>
            <h6>Descripción: {elem.description}</h6>
            </div>
            
            <div>
              <Gallery elem = {elem} files = {files}/>
            </div>
            <div className='dflex'>
            <Button onClick={()=>openModal(elem)}>Editar</Button>
            <Button onClick={()=>handleDel(elem)}>Eliminar</Button>
           {addImages ? <Button onClick={()=>setAddImages(!addImages)}>Añadir imagenes</Button> : <Button onClick={()=>setAddImages(!addImages)}>Cancelar</Button>} 
            {!addImages && <div className='dflex'> <input type="file" multiple onChange={handleFiles}/> <Button onClick={()=>handleSubmit(elem)}>Enviar</Button></div>}
            </div>
           
            
          </div>
        )
      })}
      <EditTravelModal show={editShow} setShow={setEditShow} travelToEdit={travelToEdit} setTravelToEdit={setTravelToEdit}/>
    </div>
  )
}
