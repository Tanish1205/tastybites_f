import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function SignUp() {

    const [credentials, setcredentials] = useState({name:"", email: "", password: "", geolocation: ""})
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser",{
            method : 'POST', 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.geolocation})
        });
        const json = await response.json(); 
        console.log(json); 
        if(!json.success){
          alert("Invalid credentials"); 
        } else{ navigate('/login'); }
    }
    const onchange = (e) => {
      setcredentials({...credentials, [e.target.name]:e.target.value})
    }

  return (
    <>
    <div className= 'container border border-2 border-white rounded w-25 p-3 mt-5'>
<form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Your Name</label>
    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onchange} />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' vlaue={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" value={credentials.password} id="exampleInputPassword1" onChange={onchange}/>
  </div> 
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
    <input type="text" className="form-control" name="geolocation" value={credentials.geolocation} onChange={onchange}/>
  </div>
  <button type="submit" className="btn btn-success">Submit</button>
  <Link to = '/login' className = 'm-3 btn btn-danger'>Already a user</Link>
</form>
    </div>

    </>
  )
}

export default SignUp