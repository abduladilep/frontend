import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import{allUsers}from '../Redux/Actions/userAction'

function CollectedReport() {

const dispatch = useDispatch()
const[response,setResponse] = useState([])





useEffect(() => {
   dispatch(allUsers())

  console.log("alluserr",allUsers);

  setResponse(allUsers());

}, [])
console.log("gasgdvsg",response);




  return (
    <div>

hellooooo


      
    </div>
  )
}

export default CollectedReport
