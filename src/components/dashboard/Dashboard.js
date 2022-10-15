import React, { useState, useEffect } from "react";
import axios from "axios"; //untuk intraksi dengan API
import { useNavigate } from "react-router-dom"; //untuk redirect

import jwt_decode from "jwt-decode";

import { Link } from "react-router-dom"; //meggunakan link
//Template Component
import Navbar from "../template/Navbar";
import Footer from "../template/Footer";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const navigate = useNavigate();

  //panggil funsgi refresh token
  useEffect(() => {
    refreshToken();
  }, []); //param kedua empty array agar useeffect running ketika onloaded

  //fungsi refresh token
  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      // console.log(decoded)
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };


  //cara menggunakan interceptor ini
  const axiosJWT = axios.create()

  //setiap req yang butuh token maka dapat gunakan axiosJWT ini
  axiosJWT.interceptors.request.use(async(config)=>{
    const currentDate = new Date()
    //bandingkan currebnt date dengan expre token
    if(expire * 1000 < currentDate.getTime()){ //1000 karna milisecond
        const response = await axios.get("http://localhost:5000/token"); //panggil refresh token
        //update header
        config.headers.Authorization = `Bearer ${response.data.accessToken}`
        //set token ke dalam state
        setToken(response.data.accessToken)

        const decoded = jwt_decode(response.data.accessToken);
        // console.log(decoded)
        setName(decoded.name);
        setExpire(decoded.exp);

    }
    return config;

  },(error)=>{
    //jika error reject rpromisenya
    return Promise.reject(error)
  })

  //contoh pengguna axiosJWT adalah saat ambil data user
  const getUsers = async () => {
      const response = await axiosJWT.get("http://localhost:5000/users",{
        headers:{
            Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data)
    
  };


  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1 className="title">Welcome back, {name}</h1>
        <b>MENU</b>
        <div className="container">
          <div className="buttons is-centered">
            <Link to={`../users`} className="button is-link">
              Data User
            </Link>
            <Link to={`../products`} className="button is-success">
              Data Product
            </Link>

            <button onClick={getUsers} className="button is-info">
              Get Users
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
