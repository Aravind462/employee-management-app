import { useEffect, useState } from 'react';
import './App.css'
import { Modal, Button } from 'react-bootstrap';
import { saveEmployeeAPI, getAllEmployeeAPI, deleteEmployeeAPI, updateEmployeeAPI } from './sevices/allAPI';

function App() {
  const [allEmployees,setAllEmployees] = useState([])
  const [employeeDetails,setEmployeeDetails] = useState({
    name:"",email:"",status:""
  })
  console.log(employeeDetails);
  
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(()=>{
    getAllEmployees()
  },[])

  const handleCloseAdd = () => {
    setShowAdd(false);
    setEmployeeDetails({name:"",email:"",status:""});
  }
  const handleShowAdd = () => setShowAdd(true);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (employee) => {
    setShowEdit(true)
    setEmployeeDetails({
      id:employee.id,
      name:employee.name,
      email:employee.email,
      status:employee.status
    })
  }

  const handleSave = async ()=>{
    const {name,email,status} = employeeDetails
    if(name && email && status){
      try {
        const result = await saveEmployeeAPI(employeeDetails)
        console.log(result);
        if(result.status>=200 && result.status<300){
          alert("Saved successfully!!!")
          handleCloseAdd()
          getAllEmployees()
        }
      }catch(err){
        console.log(err);
      }
    }else{
      alert("Enter all inputs!!!")
    }
  }

  const getAllEmployees = async ()=>{
    try{
      const result = await getAllEmployeeAPI()
      console.log(result);
      if(result.status>=200 && result.status<300){
        setAllEmployees(result.data)
      }
    }catch(err){
      console.log(err);
    }
  }

  const handleDelete = async (id)=>{
    try{
      await deleteEmployeeAPI(id)
      getAllEmployees()
    }catch(err){
      console.log(err);
    }
  }

  const handleEdit = async ()=>{
    const {name,email,status} = employeeDetails
    if(name && email && status){
      try{
        const result = await updateEmployeeAPI(employeeDetails)
        if(result.status>=200 && result.status<300){
          alert("Updated Successfully!!!")
          handleCloseEdit()
          getAllEmployees()
        }
      }catch(err){
        console.log(err);
      }
    }else{
      alert("Enter all inputs!!!")
    }
  }

  return (
    <>
      <button onClick={handleShowAdd} className='btn btn-info m-5' style={{position:'fixed',right:'0px',top:'0px'}}>ADD NEW EMPLOYEE</button>
      <h1 className='text-center my-5 fw-bolder'>Employee Management App</h1>
      <table className='table table-bordered container text-center'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
          {
            allEmployees?.length>0?allEmployees?.map((employee,index)=>(
              <tr key={employee.id}>
                <td>{index+1}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.status}</td>
                <td>
                  <button onClick={()=>handleShowEdit(employee)} className='btn btn-info mx-1'>Edit</button>
                  <button onClick={()=>handleDelete(employee.id)} className='btn btn-danger mx-1'>Delete</button>
                </td>
              </tr>
            )):<div className='text-danger'>No Employess!!!</div>
          }
        </tbody>
      </table>

      <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>ADD NEW EMPLOYEE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input onChange={(e)=>setEmployeeDetails({...employeeDetails,name:e.target.value})} type="text" name="" id="" placeholder='Name' className='form-control my-2'/>
          <input onChange={(e)=>setEmployeeDetails({...employeeDetails,email:e.target.value})} type="text" name="" id="" placeholder='Email' className='form-control my-2'/>
          <select onChange={(e)=>setEmployeeDetails({...employeeDetails,status:e.target.value})} id="options" name="options" className='form-select my-2'>
            <option hidden>Select status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>EDIT EMPLOYEE DETAILS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input value={employeeDetails.name} onChange={(e)=>setEmployeeDetails({...employeeDetails,name:e.target.value})} type="text" name="" id="" placeholder='Name' className='form-control my-2'/>
          <input value={employeeDetails.email} onChange={(e)=>setEmployeeDetails({...employeeDetails,email:e.target.value})} type="text" name="" id="" placeholder='Email' className='form-control my-2'/>
          <select value={employeeDetails.status} onChange={(e)=>setEmployeeDetails({...employeeDetails,status:e.target.value})} id="options" name="options" className='form-select my-2'>
            <option hidden>Select status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default App
