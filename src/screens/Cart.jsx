import React from 'react'
import trashIcon from '../assets/trash-icon.svg'
import plusicon from '../assets/plus-icon.svg'
import minusicon from '../assets/minus-icon.svg'
import { useCart, useDispatchCart } from '../components/ContextReducer';
export default function Cart() {
  const data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }
  let userEmail = localStorage.getItem("userEmail");
  const handleCheckOut = async () => {
    try {
      let response = await fetch("https://tastybites-b.onrender.com/api/orderdata", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });
      console.log("JSON RESPONSE:::::", response)
      if (response.status === 200) {
        dispatch({ type: "DROP" })
      } else {
        console.error("Error during checkout is:", response);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Size</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td >
                    <button type="button" className="btn p-0" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>
                    <img src={trashIcon} alt="Delete" width="16" height="16"></img>
                    </button> 
                </td>
                <td className='d-flex'>
                    <button type="button" className="btn p-0 " onClick={() => { dispatch({ type: "INCREMENT", index: index, price:food.price, qty:food.qty, name:food.name, size: food.size, id:food.id}) }}>
                    <img src={plusicon} alt="Increase" width="20" height="20"></img>
                    </button> 
                    <div className='px-1 mx-1 w-auto border border-5 border-light rounded' >{food.qty}</div>
                    <button type="button" className="btn p-0" onClick={() => { dispatch({ type: "DECREMENT", index: index, price:food.price, qty:food.qty, name:food.name, size: food.size, id: food.id}) }}>
                    <img src={minusicon} alt="Decrease" width="20" height="20"></img>
                    </button> 
                </td>
                </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>



    </div>
  )
}