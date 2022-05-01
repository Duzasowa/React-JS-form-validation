import React from 'react';
import {useState, useEffect} from 'react';
import './App.css'


const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true)
  const [minLengthError, setMinLengthError] = useState(false)
  const [maxLengthError, setMaxLengthError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [inputValid, setInputValid] = useState(false)


  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
          break;
        case 'isEmpty':
          value ? setEmpty(false) : setEmpty(true)
          break;
        case 'maxLength':
          value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false)
          break;
        case 'isEmail':
          const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
          break
      }
    }
  }, [value])

  useEffect( () => {
    if(isEmpty || maxLengthError || minLengthError || emailError) {
      setInputValid(false)
    } else {
      setInputValid(true)
    }

  }, [isEmpty, maxLengthError, minLengthError, emailError])

  return {
    isEmpty,
    minLengthError,
    emailError,
    maxLengthError,
    inputValid
  }
}


const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue)
  const [isDirty, setDirty] = useState(false)
  const valid = useValidation(value, validations)

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const onBlur = (e) => {
    setDirty(true)
  }

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid
  }
}



const App = () => {
  const email = useInput( '', {isEmpty: true, minLength: 5, isEmail: true,})
  const password = useInput( '', {isEmpty: true, minLength: 8, maxLength: 16})


  return (
    <main>
      <div class="circle"></div>
      <div class="register-form-container">
        <h1 class="form-title">
          Registration
        </h1>
        <div class="form-fields">
          <div class="form-field">
            {(email.isDirty && email.isEmpty) && <div style={{color: 'red'}}>The field cannot be empty</div>}
            {(email.isDirty && email.minLengthError) && <div style={{color: 'red'}}>Incorrect length</div>}
            {(email.isDirty && email.emailError) && <div style={{color: 'red'}}>Incorrect email</div>}
            <input 
              onChange={e => email.onChange(e)}
              onBlur={e => email.onBlur(e)}
              value={email.value}
              name='email' 
              type="text" 
              placeholder='Enter your email...'
            />
          </div>
          <div class="form-field">
            {(password.isDirty && password.isEmpty) && <div style={{color: 'red'}}>The field cannot be empty</div>}
            {(password.isDirty && password.maxLengthError) && <div style={{color: 'red'}}>Password is too long</div>}
            {(password.isDirty && password.minLengthError) && <div style={{color: 'red'}}>Incorrect length</div>}
            <input 
              onChange={e => password.onChange(e)}
              onBlur={e => password.onBlur(e)}
              value={password.value}
              name='password' 
              type="password" 
              placeholder='Enter your password...'
            />
          </div>
          <div class="form-buttons">
            <button disabled={!email.inputValid || !password.inputValid} type="submit" class="button">Registration</button>
            <div class="divider">или</div>
            <a href="#" class="button button-google">Google</a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
