import React, { createContext, useContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthContextInit = ({children}) => {
    const contextInitialState = {
        username: '',
        email: '',
        password: '',
      }
    
      const [userInfo, setUserInfo] = useState(contextInitialState)
    
      function setEmail(email) {
        const newState = {...userInfo, email}
        setUserInfo(newState)
      }
    
      function setPassword(password) {
        const newState = {...userInfo, password}
        setUserInfo(newState)
      }
    
      function setUsername(username) {
        const newState = {...userInfo, username}
        setUserInfo(newState)
      }
    
    const AuthContextSetters = {
      setEmail,
      setPassword,
      setUsername,
    }

return (
    <AuthContext.Provider value={{...userInfo, ...AuthContextSetters}}>
    {children}
    </AuthContext.Provider>
)    
}



//export const UseAuthContext = useContext(AuthContext)