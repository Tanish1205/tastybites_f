import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Badge from 'react-bootstrap/Badge'; 
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart, useDispatchCart } from '../components/ContextReducer';



function Navbar() {

  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem('authToken'); 
    navigate('/login');
  };
  const data = useCart();
  

  const [cartView, setCartView]= useState(false); 

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic alkatra" to="#">TastyBites</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-1">
              <li className="nav-item">
                <Link className="nav-link active fs-5 fw-bold" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem('authToken'))? 
              <li className="nav-item">
              <Link className="nav-link active fs-5 fw-bold" aria-current="page" to="/myorder">My Orders</Link>
              </li>
              :""}
            </ul>
            {(!localStorage.getItem('authToken')) ?
              <div classname="d-flex">
                <Link className="btn bg-white text-primary fw-bold mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-primary fw-bold mx-1" to="/createuser">SignUp</Link>
              </div>
                :
              <div>
                
                <div className="btn bg-white text-primary fw-bold mx-1" onClick={()=> {setCartView(true)}} >
                  MyCart {" "}
                  {<Badge pill bg="danger"> {data.length ==0 ? null: data.length  } </Badge>}
                </div>

                {cartView ? <Modal onClose={()=>{setCartView(false)}}> <Cart /> </Modal>:null}
                
                <div className="btn bg-white text-danger fw-bold mx-1" onClick={handlelogout}>
                  Logout
                </div>
              </div>
            }
              </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar