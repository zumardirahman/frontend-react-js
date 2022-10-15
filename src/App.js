import { BrowserRouter, Routes, Route } from "react-router-dom";

//Guest Component
import Login from "./components/guest/Login";
import Register from "./components/guest/Register";


//Dashoboard Component
import Dashboard from "./components/dashboard/Dashboard";

//User Component
import UserList from "./components/user/UserList";
import AddUser from "./components/user/AddUser";
import EditUser from "./components/user/EditUser";

//Product Component
import ProductList from "./components/product/ProductList";
import AddProduct from "./components/product/AddProduct";
import EditProduct from "./components/product/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />

        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />}/>
        
        <Route path="/users" element={<UserList />} />
        <Route path="users/add" element={<AddUser />} />
        <Route path="users/edit/:id" element={<EditUser />} />
        
        <Route path="/products" element={<ProductList />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
