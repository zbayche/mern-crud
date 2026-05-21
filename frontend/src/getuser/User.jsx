import React, { useEffect, useState } from 'react';
import "./User.css";
import axios from "axios";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import API_URL from '../api';

const User = () => {
    const [users,setusers] = useState([]);
    useEffect(()=>{
        const fetchData = async () => {
            try {
            const response = await axios.get(`${API_URL}/users`);
               setusers(response.data)
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        }
        fetchData()
    },[])

    const deleteUser = async (userId) => {
        await axios.delete(`${API_URL}/delete/user/${userId}`)
        .then((response)=>{
            setusers((prevUser)=>prevUser.filter((user)=>user._id !== userId))
            toast.success(response.data.message,{position:"top-right"})
        })
        
        .catch((error)=>{
            console.log(error);
        })
    }

  return (
    <div className='userTable'>
        <Link to="/add" type="button" className="btn btn-primary">
            Add User <i className="fa fa-user-plus"></i>
        </Link>
        {users.length === 0?(
          <div className='noData'>
            <h3>No Data to display</h3>
            <p>Please Add New User</p>
          </div>
        
        ):(
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Address</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user,index)=>{
                        return(
                            <tr key={user._id}>
                                <td>{index+1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td className='actionButtons'>
                                    <Link to={`/update/`+user._id} type="button" className="btn btn-info">
                                    <i className="fa fa-pencil-square-o"></i>
                                    </Link>
                                    <button onClick={()=>deleteUser(user._id)} type="button" className="btn btn-danger">
                                        <i className="fa fa-trash"></i>
                                    </button>
                                    
                                </td>
                            </tr>
                        )
                    })} 
                </tbody>
            </table>
        )}
    </div>
  );
}

export default User;
