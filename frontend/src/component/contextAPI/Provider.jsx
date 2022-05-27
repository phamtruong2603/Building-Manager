import React, { useEffect, useReducer } from 'react';
import { authReducer } from '../auth/authReducer';
import { getUser } from '../auth/authReducer';
export const Providers = React.createContext();

const Provider = ({ children }) => {

  const [user, dispatch] = useReducer(authReducer, {})

  useEffect(() => {
    (async function () {
      let response = await getUser()
      if (response) {
        dispatch({
          type: 'login',
          payload: response,
        })
      }
    })()
  }, [])

  const data = { user, dispatch }
  return (
    <Providers.Provider value={data}>
      {children}
    </Providers.Provider>
  )
}

export default Provider