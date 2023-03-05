import React, { useContext } from 'react'
import { TravelsContext } from '../../context/TravelsContext'

export const AllUsers = () => {
  const {user} = useContext(TravelsContext)
  console.log("Este es el usuario", user)
  return (
    <div>AllUsers</div>
  )
}
