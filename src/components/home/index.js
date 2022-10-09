import React from "react";
import { Link } from "react-router-dom"; //meggunakan link

import Navbar from "./Navbar";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};

const pages = ["about", "contact", "sitemap"];

const Home = () => (
  <div style={styles}>
    <Navbar pages={pages} />
    <h1 className="is-size-2 has-text-success">GeeksforGeeks</h1>
    <b>MENU</b>
    <div className="container">
      <div className="buttons is-centered">
        <Link to={`users`} className="button is-link" > Data User </Link>
        <Link to={`products`} className="button is-success" > Data Product </Link>
      </div>
    </div>
  </div>
);

export default Home;
