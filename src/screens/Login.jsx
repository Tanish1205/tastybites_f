import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://tastybites-b.onrender.com/api/loginuser", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Invalid credentials");
    }
    else{
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log("autharization token is: ", localStorage.getItem("authToken"));
      navigate('/'); 
    }
  }
  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className='container flex border border-2 border-white rounded w-25 p-3 mt-5 col-6 col-md-4 col-lg-3'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 w-100">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' vlaue={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3 w-100">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={credentials.password} id="exampleInputPassword1" onChange={onchange} />
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
          <Link to='/createuser' className='m-3 btn btn-danger'>I'm a new user</Link>
        </form>
      </div>

    </>
  )
}

export default Login