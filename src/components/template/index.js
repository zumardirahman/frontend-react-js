import React from "react";
// import { Link } from "react-router-dom"; //meggunakan link

import Navbar from "./Navbar";
import Footer from "./Footer";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};


const Template = () => (
  <div style={styles}>
    <Navbar />
  </div>
);

export default Template;
