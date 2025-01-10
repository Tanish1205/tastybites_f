import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
// import { useDispatchCart, useCart } from '../components/ContextReducer'

function Home() {

  const [search, setSearch] = useState(''); 
  const [foodCategory, setfoodCategory] = useState([]);
  const [foodItem, setfoodItem] = useState([]);
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    response = await response.json();
    setfoodCategory(response[1]);
    setfoodItem(response[0]);
  }
  useEffect(() => {
    loadData();
  }, []) //[] is for the dependency list  
  //[] stores the component on which the function is dependent
  // empty [] means it will run when the whole page is loaded


  return (
    <div>
      <div> <Navbar /> </div>
      <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit: "contain !important"}}>
                <div className="carousel-inner" style={{maxHeight: "600px"}} id='carousel'>
                    <div className="carousel-caption" style={{zIndex:"4"}} >
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" 
                              placeholder="Search" aria-label="Search" 
                              value={search} 
                              onChange={(e)=> {setSearch(e.target.value)}} />
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="/burger.jpg" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="/pastry.jpg" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="/pizza.jpg" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
      </div>
      <div className='container m-3'>
        {
          foodCategory.length > 0 ?
            foodCategory.map((data) => {
              return (
                <div className='row mb-3'>
                  <div key={data._id} className='fs-3 m-3 '>
                    {data.CategoryName}
                  </div>
                  <hr/>
                  {foodItem.length > 0 ? 
                    foodItem.filter((item)=> (item.CategoryName === data.CategoryName) 
                    && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                    .map((filteredItem) => {
                      return (
                        <div key={filteredItem._id} className='col-12 col-md-6 col-lg-3'>
                          <Card  foodItem = {filteredItem}
                          options = {filteredItem.options[0]}
                          />
                        </div>
                      )
                    }): 
                    <div>No data found</div>
                  }
                </div>
              )
            }) : <div> aj;flaj;sl </div>
        } 
      </div>
      <div> <Footer /> </div>
    </div>

  )
}

export default Home