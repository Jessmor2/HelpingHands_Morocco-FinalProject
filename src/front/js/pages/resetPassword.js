import React from 'react';
import Authenticate from '../component/authenticate';
const ResetPassword = () => {
  return (
    <>
      <Authenticate buttonText={'Submit'} title={'Reset Password'} showResetPassword={true} />
    </>
  )
}


export default ResetPassword