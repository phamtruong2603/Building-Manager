import React, { useEffect, useReducer, useState } from 'react';
import { authReducer, getDetailUser } from '../auth/authReducer';
import { getUser } from '../auth/authReducer';
export const Providers = React.createContext();

const Provider = ({ children }) => {

  const [user, dispatch] = useReducer(authReducer, {})
  const [dataUser, setDataUser] = useState({})


  useEffect(() => {
    (async function () {
      let response = await getUser()
      setDataUser(await getDetailUser())
      if (response) {
        dispatch({
          type: 'login',
          payload: response,
        })
      }
    })()
  }, [])

  const data = { user, dispatch, dataUser }
  return (
    <Providers.Provider value={data}>
      {children}
    </Providers.Provider>
  )
}

export default Provider