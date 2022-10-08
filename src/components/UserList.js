import React, { useState, useEffect } from "react"; //untuk fetch data
import axios from "axios"; //untuk intraksi dengan API

export const UserList = () => {
  const [users, setUser] = useState([]); //state baru

  useEffect(() => {
    getUsers();
  });

  const getUsers = async () => {
    //metode fetch data
    const response = await axios.get("http://localhost:5000/users");
    // console.log(response.data)
    setUser(response.data);
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
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
              <tr key={user.id}>
                <td>{index +1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>
                    <button className="button is-small is-info">Edit</button>
                    <button className="button is-small is-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
