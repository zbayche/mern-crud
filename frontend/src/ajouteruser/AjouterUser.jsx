import React, { useState } from 'react';
import './ajouterUser.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import API_URL from '../api';

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
        await axios.post(`${API_URL}/user`,user)
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
        <Link to='/' type='button' className='btn btn-secondary'>
            <i className="fa fa-backward"></i> Back
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
            <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AjouterUser;
