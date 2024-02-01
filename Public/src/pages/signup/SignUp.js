import React, { useState } from 'react';
import './signup.css';
import coffee from "../../assets/coffee.png";
import { useNavigate } from 'react-router-dom';
import {useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { UserSignUpSchema } from '../../assets/schema';

//PURPOSE: Signing Up of Users
const SignUp = () => {
  let navigate = useNavigate();
  const {register, handleSubmit, reset, formState: {errors} } = useForm({ resolver: yupResolver(UserSignUpSchema)});
  
  //Errors from server
  const [ error, setError ] = useState('');
  const [loading, setloading] = useState(false);

  const submitForm = async(data) => {
    setloading(true);
    try {
      const response = await fetch("/api/user", {method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type' : 'application/json'}});
      const user = await response.json();
  
      if (user.status === 'fail') throw new Error(user.message);

      console.log(user);
      reset();
    } catch (err) {
      setError(err.message);
    }
    setloading(false);
    setTimeout(()=> setError(''), 3000);
  }
  return (
    <div className='container'>
      <div className='placeHolder'>
          <div className='firstPart-signup'>
            <h1 className='header2'> HELLO THERE </h1>
            <p>Enter your personal details,</p>
            <p>and find friends.</p>
            <button
              className='classic-button'
              onClick={() => {
                navigate('/');
              }}
            >SIGN IN</button>
          </div>
          <div className='secondPart-signup'>
            <img src={coffee} alt="coffee.png" className='coffee'/>
            <h1 className='header1'> CREATE ACCOUNT </h1>
            <form onSubmit={handleSubmit(submitForm)}>
                <p className="signup-error-text">{error}</p>
              <input className="box" type="text" placeholder="First Name" {...register('firstName')}/>
                <p className="signup-error">{errors?.firstName?.message}</p>
              <input className="box" type="text" placeholder="Last Name"  {...register('lastName')}/>
                <p className="signup-error">{errors?.lastName?.message}</p>
              <input className="box" type="text" placeholder="Email" {...register('email')}/>
                <p className="signup-error">{errors?.email?.message}</p>
              <hr className="new1"></hr>
              <input className="box" type="password" placeholder="Password" {...register('password')}/>
                <p className="signup-error">{errors?.password?.message}</p>
              <input className="box" type="password" placeholder="Confirm Password" {...register('confirmPassword')}/>
              <p className="signup-error">{errors?.confirmPassword?.message}</p>
              <button
                className='classic-button'
                disabled={loading} 
                style={{display:"block", marginRight: "50%", marginLeft: "50%", transform: "translateX(-50%)", marginTop: "4%"}}
                >
                  {loading ? "Please Wait" : "Sign Up"}
              </button>
            </form>
          </div>
      </div>
    </div>
  )
}

export default SignUp