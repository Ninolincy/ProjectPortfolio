import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeDetails = () => {
    const [employee, setEmployee] = useState([])//state variable
    const {id} = useParams() //take id from url params
    const Navigate = useNavigate()
        useEffect(() => {
            axios.get('http://localhost:3000/employee/details/'+id)
            .then(result => {
                setEmployee(result.data[0])
            })
            .catch(err => console.log(err))
        }, [])
        const handleLogout = () => {
          axios.get('http://localhost:3000/employee/logout')
          .then(result => {
            if(result.data.logoutStatus){
              localStorage.removeItem("valid");
              Navigate('/')}
          })
          .catch(err => console.log(err))
        }
  return (
    <div>
      <div className='p-2 d-flex justify-contnet-center shadow'>
        <h4>Employee management System</h4>
      </div>
      <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
        <img src={"http:/localhost:3000/images/" +employee.image} className='emp_det_image' />
        <div className='d-flex align-items-center flex-column mt-5'>
          <h3>Name: {employee.name}</h3>
          <h3>Email: {employee.email}</h3>
          <h3>Salary: {employee.salary}</h3>
        </div>
        <div>
          <button className='btn btn-primary me-2'>Edit</button>
          <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetails