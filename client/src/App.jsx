import React from 'react';
import { useState, useEffect } from 'react';
import './App.css'

const App = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [emailError, setEmailError] = useState('Email cannot be empty')
  const [passwordError, setPasswordError] = useState('Password cannot be empty')
  const [formValid, setFormValid] =useState(false)

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [emailError, passwordError]);

  const emailHandler = (e) => {
    setEmail(e.target.value)
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Invalid email')
    } else {
      setEmailError("")
    }
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value)
    if(e.target.value.length < 8 || e.target.value.length > 16) {
      setPasswordError('The password must be a minimum of 8 characters and a maximum of 16')
      if(!e.target.value) {
        setPasswordError('Password cannot be empty')
      }
    } else {
      setPasswordError('')
    }
  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
    }
  }


  return (
    <div class="main_container">
      <div class="intro_container">
        <div class="auth_container">
          <div class="auth_title">Registration</div>
          <div class="auth_panel">
            {(emailDirty && emailError) && <div style={{color:'red'}}>{emailError}</div>}
            <input 
              onChange={e => emailHandler(e)}
              value={email}
              onBlur={e => blurHandler(e)} 
              name='email' 
              type="text" 
              placeholder='Enter your email...'
            />
            {(passwordDirty && passwordError) && <div style={{color:'red'}}>{passwordError}</div>}
            <input 
              onChange={e => passwordHandler(e)}
              value={password}
              onBlur={e => blurHandler(e)} 
              name='password' 
              type="password" 
              placeholder='Enter your password...'
            />
            <button disabled={!formValid} type="submit">Registation</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
