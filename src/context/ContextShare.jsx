import React, { createContext, useState } from 'react'
// create a folder jsw in contect folder in src
// createContect()=> to create context

export const AddProjectResponseContext = createContext()
export const EditProjectResponseContext = createContext()
export const isAuthTokenContext = createContext()

function ContextShare({children}) {
  // children is a predefined props used to share data between all components
    const [addProjectResponse,setAddProjectResponse] = useState({})
    const [editProjectResponse,setEditProjectResponse] = useState({})
    const [isAuthToken,setIsAuthToken] = useState(true)
  return (
    <>
    <AddProjectResponseContext.Provider value={{addProjectResponse,setAddProjectResponse}}>
     <EditProjectResponseContext.Provider value={{editProjectResponse,setEditProjectResponse}}>
       <isAuthTokenContext.Provider value={{isAuthToken,setIsAuthToken}}>
          {children}
          {/* provider -> provide the data to the component 
          children - provide data to every component
          value = data to be provided */}
       </isAuthTokenContext.Provider>
     </EditProjectResponseContext.Provider>
      </AddProjectResponseContext.Provider>
    </>
  )
}

export default ContextShare