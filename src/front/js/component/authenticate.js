import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useRoutes } from 'react-router-dom';
import bannerImgURL from "../../img/banner.jpg";
import logoImageUrl from "../../img/capture.png";
import googleImg from "../../img/google.png";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { auth } from '../firebase.js'
import { Context } from "../store/appContext";
const divStyle = {
  backgroundImage: `url(${bannerImgURL})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  color: '#fff'
};
const Authenticate = (props) => {
  const [input, setInput] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('not specified');
  const [street_address, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const { store, actions } = useContext(Context)
  const [storage, setStorageData] = useState()
  const [showError, setError] = useState()
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  useEffect(() => {
    setStorageData(localStorage.getItem('user_id'))
  })
  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await auth.signInWithPopup(provider);
      if (props.showSignup) {
        const obj = {
          email: result.user.email,
          first_name: result.user.displayName,
          password: '',
          social: true
        }
        actions.createAccount(obj).then(() => {
          navigate('/login')
        })
      }
      if (props.showLogin) {
        const obj = {
          email: result.user.email,
          password: '',
          social: true
        }
        actions.getToken(obj).then(() => {
          setTimeout(() => {
            if (localStorage.getItem('access_token') != null) {
              navigate('/dashboard')
            }
          }, 500)
        })
      }
    } catch (error) {
      console.error('Google login error:', error);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    document.getElementById("firstName")?.setAttribute("required", "");
    document.getElementById("lastName")?.setAttribute("required", "");
    document.getElementById("email")?.setAttribute("required", "");
    document.getElementById("inputPassword")?.setAttribute("required", "");
    if (input != '' && password != '' && props.showLogin) {
      const obj = {
        email: input,
        password: password,
        social: false
      }
      actions.getToken(obj).then(() => {
        if (store.isLoginSuccess) {
          navigate('/dashboard')
        }
      })
    } else if (props.showSignup && firstName != '' && lastName != '' && input != '' && password != '') {
      const obj = {
        email: input,
        password: password,
        first_name: firstName,
        last_name: lastName
      }
      actions.createAccount(obj).then(() => {
        if (store.isSignup) {
          navigate('/login')
        }
      })
    } else if (props.showChangePassword && input != '' && newPassword != '') {
      const obj = {
        email: input,
        old_password: password,
        new_password: newPassword
      }
      actions.changePassword(obj).then(() => {
        if (store.isPasswordRecovery) {
          if (store.isChangePassword) {
            navigate('/login')
          }
        }
      })
    } else if (props.showForgotPassword) {
      const obj = {
        email: input
      }
      actions.requestForgotPassword(obj)
    } else if (props.showResetPassword && newPassword != '' && reEnterPassword != '') {
      if (reEnterPassword !== newPassword) {
        document.getElementById("inputPassword")?.setAttribute("required", "");
        setError(true)
        return;
      }
      setError(false)
      const obj = {
        new_password: newPassword,
        email: searchParams.get('email'),
        token: searchParams.get('token')
      }
      actions.resetPassword(obj).then(() => {
        if (store.isPasswordReset) {
          navigate('/login')
        }
      })
    }
  }
  return (
    <>
      <div className='login-wrapper row'>
        <div className='col-md-8 col-sm-12' style={divStyle}>
          <h3 className='left-login-container'>Effortless Giving, Immediate <br /><br />Our app streamlines the process of supporting earthquake relief in Morocco. Experience the ease of giving with just a few taps and witness your contributions create an immediate impact. Join us in making a real difference, effortlessly.</h3>
        </div>
        <div className='row login-text col-sm-12 col-md-4'>
          <div className='login-container'>
            <div className='logo-image-wrapper'>
              <Link to="/">
                <img
                  className="logo"
                  src={logoImageUrl}
                  style={{ width: "95px" }}
                />
              </Link>
            </div>
            {store.error && <div className="alert alert-danger" role="alert">
              {store.error}
            </div>}
            {store.message && <div className="alert alert-success" role="success">
              {store.message}
            </div>}
            {showError && <div className="alert alert-danger" role="alert">
              Password and confirm password do not match. Please make sure the passwords match exactly.
            </div>}
            <h3 className='mb-4'>{props?.title}</h3>
            <form id="needs-validation" noValidate onSubmit={handleSubmit}>
              {props?.showSignup && <div className='row col'>
                <div className="mb-3 col-md-6 ms-0">
                  <label htmlFor="firstName" className="form-label">First name</label>
                  <input type="text" className="form-control" id="firstName" placeholder="Enter First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="mb-3 col-md-6 ms-0">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input type="text" className="form-control" id="lastName" placeholder="Enter Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>}
              {!props.showResetPassword && <div className="mb-3 row ms-0">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={(e) => setInput(e.target.value)} value={input} />
              </div>}

              {!props?.showChangePassword && !props.showForgotPassword && !props.showResetPassword && <div className="mb-3 row ms-0">
                <label htmlFor="inputPassword" className="col-form-label">Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" id="inputPassword" />
                {props.showLogin && <div className='text-end fst-italic'><Link to={'/forgot-password'}>Forgot a password?</Link></div>}
              </div>}
              {props?.showChangePassword && <>
                <div className="mb-3 row ms-0">
                  <label htmlFor="inputPassword" className="col-form-label">Old Password</label>
                  <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" id="inputPassword" />
                </div><div className="mb-3 row ms-0">
                  <label htmlFor="inputPassword" className="col-form-label">New Password</label>
                  <input type="password" className="form-control" id="inputPassword" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
                </div></>}
              {props?.showResetPassword && <><div className="mb-3 row ms-0">
                <label htmlFor="inputPassword" className="col-form-label">Password</label>
                <input type="password" className="form-control" id="inputPassword" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
              </div> <div className="mb-3 row ms-0">
                  <label htmlFor="inputPassword" className="col-form-label">Confirm Password</label>
                  <input type="password" className="form-control" id="inputPassword" onChange={(e) => setReEnterPassword(e.target.value)} value={reEnterPassword} />
                </div></>}
              <button type="submit" className="btn btn-primary">{props?.buttonText}</button>
            </form>
            {props?.showLogin && <div className='mt-3'>Don't have an account yet! <Link to={'/signup'}>Create one</Link></div>}
            {props?.showSignup && <div className='mt-3'>Already have an account? <Link to={'/login'}>Login here!</Link></div>}
            {props?.showGoogleLogin && <>
              <hr className='mt-4' />
              <div className='d-flex justify-content-center'>
                <button className="btn btn-light mb-3" onClick={signInWithGoogle}><img src={googleImg} style={{ width: "30px", height: "30px" }} /> <strong>{props?.showLogin ? 'Continue with Google' : 'Signup with Google'}</strong></button>
              </div>
            </>
            }
          </div>
        </div>
      </div>
    </>
  )
}
export default Authenticate