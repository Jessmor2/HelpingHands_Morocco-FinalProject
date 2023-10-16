import React from 'react';

import Authenticate from '../component/authenticate';
const Signup = () => {


  const signInWithFacebook = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    try {
      await auth.signInWithPopup(provider);
      console.log('Facebook login successful');
    } catch (error) {
      console.error('Facebook login error:', error);
    }
  };
  return (
    <>
      <Authenticate buttonText={'Signup'} title={'Create Account'} showSignup={true} showGoogleLogin={true} />
    </>
  )
}

export default Signup