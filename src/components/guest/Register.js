import React, { useState } from "react";
import axios from "axios"; //untuk intraksi dengan API
import {useNavigate} from "react-router-dom" //untuk redirect 

export const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState('') //handle error dengan memasukan erorr ke state

  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault(); //ketika submit pagenya tidak reload
    try {
      await axios.post("http://localhost:5000/register", {
        name,
        email,
        gender,
        password,
        confirmPassword,
      });
      navigate("/");
    } catch (error) {
      if (error.response){
        setMsg(error.response.data.msg)
      }
    }
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form onSubmit={Register} className="box">
              <p className="has-text-centered">{msg}</p>
                <div className="field mt-5">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Gender</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="field mt-5">
                  <label className="label">Password</label>
                  <div className="controls">
                    <input
                      type="password"
                      className="input"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="field mt-5">
                  <label className="label">Confirm Password</label>
                  <div className="controls">
                    <input
                      type="password"
                      className="input"
                      placeholder="********"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="field mt-5">
                  <button type="submit" className="button is-success">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
