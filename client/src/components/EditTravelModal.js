import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TravelsContext } from '../context/TravelsContext';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'


import "./newTravel.scss"


export const EditTravelModal = ({ show, setShow, travelToEdit, setTravelToEdit})=> {
    
    const {user, setTravel, travel } = useContext(TravelsContext);
   
    let handleClose = () => {
        setShow(false);
    }
    let handleChange = (e) =>{
        let {name, value} = e.target;
        setTravelToEdit({...travelToEdit, [name]:value})
    }
    
    let handleSubmit = (e) =>{
        
        let arrayProv = [...travel];
        arrayProv.map((e)=>{
            if(e.travel_id === travelToEdit.travel_id){
                e.city = travelToEdit.city;
                e.country = travelToEdit.country;
                e.description = travelToEdit.description;
            }
        })
        axios
        .put(`http://localhost:4000/travels/editTravel/${travelToEdit.travel_id}`, travelToEdit)
        .then((res)=>{
            setTravel(arrayProv);
            setShow(false);
        })
        .catch((err)=>console.log(err));
    }

 return (
    <>
    
    <Modal
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleClose}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Editar Viaje
        </Modal.Title>
        
      </Modal.Header>
      <Modal.Body>
      <div>
        <label htmlFor="">Ciudad</label>
      <input
        type="text"
        name="city"
        placeholder="Ciudad"
        value={travelToEdit?.city}
        onChange={handleChange}
      />
      <label htmlFor="">País</label>
      <input
        type="text"
        name="country"
        placeholder="País"
        value={travelToEdit?.country}
        onChange={handleChange}
      />
      <label htmlFor="">Descripción</label>
      <input type="text" name="description" placeholder="Añade una descripción" onChange={handleChange} value={travelToEdit?.description} />
   
     
     
    </div>
      </Modal.Body>
      <Modal.Footer>
      <Button className='botonesTravel' onClick={handleSubmit}>Aceptar</Button>
      <Button className='botonesTravel' onClick={()=>setShow(false)}>Cancelar</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}