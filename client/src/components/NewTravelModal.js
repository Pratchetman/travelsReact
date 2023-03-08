import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TravelsContext } from '../context/TravelsContext';
import axios from 'axios';
import React, { useContext, useState } from 'react'


import "./newTravel.scss"

const travelInitial = {
    city: "",
    country: "",
    description: ""
}

export const NewModalTravel= ({show, setShow})=> {
    const [newTravel, setNewTravel] = useState(travelInitial);
    const [files, setFiles] = useState([]);
    const {user, setTravel, travel} = useContext(TravelsContext);
    
    let handleClose = () => {
        setShow(false);
    }
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
         Nuevo Viaje
        </Modal.Title>
        
      </Modal.Header>
      <Modal.Body>
      <div>
      <input
        type="text"
        name="city"
        placeholder="Ciudad"
        vale={newTravel?.city}
        onChange={handleChange}
      />
      <input
        type="text"
        name="country"
        placeholder="País"
        value={newTravel?.country}
        onChange={handleChange}
      />
      <input type="text" name="description" placeholder="Añade una descripción" onChange={handleChange} value={newTravel?.description} />
      <h5>Fotos</h5>
      <input
        type="file"
        name="file"
        multiple
        onChange={handleFiles}
        
      />
     
     
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