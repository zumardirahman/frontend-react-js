import React, { useState, useEffect } from "react";
import axios from "axios"; //untuk intraksi dengan API
import { useNavigate } from "react-router-dom"; //untuk redirect

import jwt_decode from "jwt-decode"

import { Link } from "react-router-dom"; //meggunakan link
//Template Component
import Navbar from '../template';

const Dashboard = () => {
    const [name, setName] = useState('')
    const [token, setToken] = useState('')


    //panggil funsgi refresh token
useEffect(()=>{
    refreshToken()
},[]) //param kedua empty array agar useeffect running ketika onloaded

    //fungsi refresh token
    const refreshToken = async()=>{
        try{
            const response = await axios.get('http://localhost:5000/token')
            setToken(response.data.accessToken)
            const decoded = jwt_decode(response.data.accessToken)
            // console.log(decoded)
            setName(decoded.name)
        }catch(error){

        }
    }

  return (
    <>
    <Navbar/>
    <div className='container mt-5'><h1 className="title">Welcome back, {name}</h1>
    <b>MENU</b>
    <div className="container">
      <div className="buttons is-centered">
        <Link to={`users`} className="button is-link" > Data User </Link>
        <Link to={`products`} className="button is-success" > Data Product </Link>
      </div>
    </div></div>
    </>
  )
}

export default Dashboard