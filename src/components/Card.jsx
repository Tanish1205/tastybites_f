import React, {useEffect, useRef, useState} from 'react'
import { useDispatchCart, useCart } from '../components/ContextReducer'


function Card(props) {

  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef(); 
  let options = props.options;
  let priceOption = Object.keys(options);
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  let finalPrice = qty* parseInt(options[size]); 
  
  useEffect(()=>{
    setSize(priceRef.current.value); 
  },[])
  

  const handleAddtoCart = async () => {
    let food = null;
    for (const item of data) {
      if (item.id === props.foodItem._id && item.size === size) {
        food = item;
        break;
      }
    }  

    if (food) {
      await dispatch({
        type: "UPDATE",
        id: props.foodItem._id,
        qty: qty,
        price: finalPrice,
        size: size, 
        imga: props.foodItem.img
      });
    } else {
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size, 
        imga: props.foodItem.img
      });
    }
  }

  return (

    <div className="card mt-4 border-primary border-2 " style={{ "width": "18rem", "maxHeight": "360px" }}>
      <img src={props.foodItem.img} className="card-img-top" style={{ height: "150px", objectFit: "fill" }} alt="..." />
      <div className="card-body">
        <h5 className="card-title">{props.foodItem.name}</h5>
        <div className='container w-100'>
          <select className='m-1 h-100 bg-primary rounded' onChange={(e) => setQty(e.target.value)}>
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              )
            })}
          </select>
          <select className='m-1 h-100 bg-primary rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
            {priceOption.map((data) => {
              return <option key={data} value={data}>{data}</option>
            })}
          </select>
          <div className='d-inline h-100 fs-5'>₹{finalPrice}/-</div>
        </div>
        <hr></hr>
        <button className='btn btn-primary justify-center mb-1' onClick={handleAddtoCart}>Add to Cart</button>
      </div>
    </div>
  )
}

export default Card