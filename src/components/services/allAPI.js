import { commonAPI } from "./commonAPI"
import {BASE_URL}   from "./baseurl"




// register api

export const registerAPI = async(users)=>{
  return   await commonAPI('POST',`${BASE_URL}/user/register`,users,"")
}

// login api
export const loginAPI = async(users)=>{
  return   await commonAPI('POST',`${BASE_URL}/user/login`,users,"")
}

// logic to add project

export const addProjectAPI = async(reqBody,reqHeader)=>{
  return await commonAPI('POST',`${BASE_URL}/project/add`,reqBody,reqHeader)
}
// get homeproject

export const homeProjectAPI = async()=>{
  return await commonAPI('GET',`${BASE_URL}/project/home-project`)
}

//  get allprojects

export const allProjectAPI = async(searchKey,reqHeader)=>{
  // quary parameter = path?key=value
  return await commonAPI('GET',`${BASE_URL}/project/all-project?search=${searchKey}`,"",reqHeader)
}

// get userproject

export const userProjectAPI = async(reqHeader)=>{
  return await commonAPI('GET',`${BASE_URL}/user/all-project`,"",reqHeader)
}

// edit the project
export const editProjectAPI = async(projectId,reqBody,reqHeader)=>{
  // id is passed as path parameter
  return await commonAPI('PUT',`${BASE_URL}/project/edit/${projectId}`,reqBody,reqHeader)
}

// delete userproject

export const deleteUserProjectAPI = async(projectId,reqHeader)=>{
  return await commonAPI('DELETE',`${BASE_URL}/project/remove/${projectId}`,{},reqHeader)
}

// edit profile
export const editProfileAPI = async(reqBody,reqHeader)=>{
  // id is passed as path parameter
  return await commonAPI("PUT",`${BASE_URL}/user/edit`,reqBody,reqHeader)
}



