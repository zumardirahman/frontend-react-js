import React, { useState, useEffect } from "react"; //untuk fetch data
import axios from "axios"; //untuk intraksi dengan API
import { Link } from "react-router-dom"; //meggunakan link
import Navbar from "../template";

import { useNavigate } from "react-router-dom"; //untuk redirect
import jwt_decode from "jwt-decode";

export const UserList = () => {
  const [users, setUser] = useState([]); //state baru

  useEffect(() => {
    refreshToken();
    getUsers();
  }, []);

////refressh tokeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeennnnnnnnnnnnnnn
const navigate = useNavigate();
const [token, setToken] = useState("");
const [expire, setExpire] = useState("");
  //fungsi refresh token
  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      // console.log(decoded)
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
        setExpire(decoded.exp);

    }
    return config;

  },(error)=>{
    //jika error reject rpromisenya
    return Promise.reject(error)
  })
////refressh tokeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeennnnnnnnnnnnnnn

  //get data
  const getUsers = async () => {
    //metode fetch data
    const response = await axiosJWT.get("http://localhost:5000/users/");
    // console.log(response.data)
    setUser(response.data);
  };

  const deleteUser = async (id) => {
    try {
      await axiosJWT.delete(`http://localhost:5000/users/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="columns mt-5 is-centered">
        <div className="column is-half">
          <Link to={`add`} className="button is-success">
            Add New
          </Link>
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.uuid}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>
                    <Link
                      to={`edit/${user.id}`}
                      className="button is-small is-info"
                    >
                      Edit
                    </Link>
                    <Link
                      onClick={() => deleteUser(user.id)}
                      className="button is-small is-danger"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
