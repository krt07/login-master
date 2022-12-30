import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './style.css';
import passwordHideImg from './images/password1.png';
import passwordShowImg from './images/password2.png';

const Register = () => {
  const [passwords, setPasswords] = useState(false)

  const [user, setUser] = useState({
    firstName: '',
    lastName:'',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user, //spread operator
      [name]: value,
    })
  }

  //register function
  const register = () => {
    const { firstName,lastName, email, password } = user
    if (firstName && lastName && email && password) {
      axios
        .post('http://localhost:3010/Register', user)
        .then((res) => console.log(res))
    } else {
      alert('invalid input')
    }
  }
  return (
    <div className='register_Wrapper'>
      <form method='post' className='form_Submit'>
        <h2>Create New Account</h2>
        <span className='sign_In'>
          Already have an account ?
          <Link to='/' target='_blank' className='btn_hover'>
            Sign in
          </Link>
        </span>
        <input
          type='text'
          id='create-account-pseudo'
          className='user_input'
          name='name'
          value={user.firstName}
          onChange={handleChange}
          placeholder='Full Name'
        />
         <input
          type='text'
          id='create-account-pseudo'
          className='user_input'
          name='name'
          value={user.lastName}
          onChange={handleChange}
          placeholder='Last Name'
        />
        <input
          type='text'
          id='create-account-first-name'
          className='user_input'
          name='email'
          value={user.email}
          onChange={handleChange}
          placeholder='Email'
        />
        <div className='flex_Search'>
          <input
            type={passwords ? 'text' : 'password'}
            id='create-account-email'
            className='user_input'
            name='password'
            value={user.password}
            onChange={handleChange}
            placeholder='Password'
          />
          <span onClick={() => setPasswords(!passwords)}>
            { !passwords ?
            <img src={passwordHideImg} alt="password hide" />
            :<img src = {passwordShowImg} alt= "password show" />}
          </span>

        </div>
        <button type='submit' className='btn_register' onClick={register}>
          Register
        </button>
      </form>
    </div>
  )
}

export default Register
