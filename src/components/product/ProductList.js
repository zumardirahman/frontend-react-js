import  { React, useState, useEffect } from "react"; //untuk fetch data
import axios from "axios"; //untuk intraksi dengan API
import { Link } from "react-router-dom"; //meggunakan link

export const ProductList = () => {
  const [products, setProduct] = useState([]); //state baru

  useEffect(() => {
    getProducts();
  },[]);

  const getProducts = async () => {
    //metode fetch data
    const response = await axios.get("http://localhost:5000/products/");
    // console.log(response.data)
    setProduct(response.data);
  };

  const deleteProduct = async(id)=>{
    try {
        await axios.delete(`http://localhost:5000/products/${id}`)
        getProducts()
    } catch (error) {
        console.log(error)
    }
  }
 
  return (
    <div className="container mt-5">
      <div className="columns is-multiline">
      {products.map((product) => (
        <div className="column is-one-quarter" key={product.id}>
       <div className="card">
         <div className="card-image">
           <figure className="image is-4by3">
             <img src={product.url} alt="Product"></img>
           </figure>
         </div>
         <div className="card-content">
           <div className="media">
            
             <div className="media-content">
               <p className="title is-4">{product.name}</p>
             </div>
           </div>
       
         </div>

         <footer className="card-footer">
         <Link to={`edit/${product.id}`} className="card-footer-item" > Edit </Link>
         <Link onClick={()=> deleteProduct(product.id)} className="card-footer-item" > Delete </Link>
         
         </footer>
       </div>
       </div>
       
       ))}
       
      </div>
    </div>
  );
};

export default ProductList;
