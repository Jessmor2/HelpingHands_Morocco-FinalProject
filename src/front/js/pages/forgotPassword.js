import React from 'react';
import Authenticate from '../component/authenticate';
const ForgotPassword = () => {
  return (
    <>
      <Authenticate buttonText={'Send Reset Email'} title={'Forgot Password'} showForgotPassword={true} />

    </>
  )
}

export default ForgotPassword