import commonAPI from "./commonAPI"
import SERVERURL from "./serverURL"

// saveEmployeeAPI
export const saveEmployeeAPI = async (contactDetails)=>{
    return await commonAPI("POST",`${SERVERURL}/employees`,contactDetails)
}

// getAllEmployeeAPI
export const getAllEmployeeAPI = async ()=>{
    return await commonAPI("GET",`${SERVERURL}/employees`,{})
}

// deleteEmployeeAPI
export const deleteEmployeeAPI = async (id)=>{
    return await commonAPI("DELETE",`${SERVERURL}/employees/${id}`,{})
}

// updateEmployeeAPI
export const updateEmployeeAPI = async (employeeDetails)=>{
    return await commonAPI("PUT",`${SERVERURL}/employees/${employeeDetails.id}`,employeeDetails)
}