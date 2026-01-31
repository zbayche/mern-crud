import React, { useState } from 'react';
import './ajouterUser.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AjouterUser = () => {
    const users =  {
        name: "",
        email: "",
        address: ""
    }
    const [user,setUser] = useState(users);
    const navigate = useNavigate();
    const inputHandler = (e) => {
        const {name,value} = e.target;
        console.log(name, value);
        setUser({...user, [name]: value})
    }
    const submitForm = async (e) => {
        e.preventDefault();
        // await axios.post("http://localhost:8000/api/user",user)
        await axios.post("http://20.39.139.33:8000/api/user",user)
        .then((response)=>{
            toast.success(response.data.message, {position: "top-right"});
            navigate("/");
        })
        .catch((error)=>{
            console.log(error);
        })
    }
  return (
    <div className='addUser'>
        <Link to='/' type='button' class='btn btn-secondary'>
            <i class="fa-solid fa-backward"></i> Back
        </Link>
      <h3>Add New User</h3>
      <form className='addUserForm' onSubmit={submitForm}>
        <div className="inputGroup">
            <label htmlFor="name">Name:</label>
            <input type="text" id='name' name='name' onChange={inputHandler} autoComplete='off' placeholder='Enter your Name'/>
        </div>

        <div className="inputGroup">
            <label htmlFor="email">Email:</label>
            <input type="email" id='email' name='email' onChange={inputHandler} autoComplete='off' placeholder='Enter your Email'/>
        </div>

        <div className="inputGroup">
            <label htmlFor="address">Address:</label>
            <input type="text" id='address' name='address' onChange={inputHandler} autoComplete='off' placeholder='Enter your Address'/>
        </div>
        <div className="inputGroup">
            <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AjouterUser;
