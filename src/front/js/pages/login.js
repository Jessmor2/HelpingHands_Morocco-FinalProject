import React from 'react';


import Authenticate from '../component/authenticate';
const Login = () => {

  const loginToThePortal = () => {
    if (input != '' && password != '') {
      const obj = {
        name: input,
        password: password
      }
      actions.getToken(obj)
    }

  }

  return (
    <>
      <Authenticate buttonText={'Login'} title={'Login'} showLogin={true} showGoogleLogin={true} />
    </>
  )
}

export default Login