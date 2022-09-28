import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'semantic-ui-react'

import { checkPass, createPass } from '../redux/userProvider';

const LoginPassword = () => {
  const [formData, setFormData] = useState({
		password:'',
	});

  const { loading, error, dataToLog } = useSelector((state) => ({ ...state.user }));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onPasswordChange = (event) => {
    setFormData({
      ...formData, [event.target.name]: event.target.value
    });
  }

  const onLogin = () => {
    console.log(dataToLog.hasPassword)
    dataToLog.hasPassword ? dispatch(checkPass({ formData, navigate })) : dispatch(createPass({ formData, navigate }));
  }

  const form_style = {
    margin: "auto",
		padding: "15px",
		maxWidth: "500px",
		alignContent: "center",
		paddingTop: "10%",
  }

  return(
    <>
    <div style={form_style}>
    <h2>{dataToLog.role}</h2>
    <br />
    <Form onSubmit={onLogin} noValidate className={loading ? "loading" : ''}>
      <Form.Input
        label= {dataToLog.hasPassword  ? 'Please enter your password!' : 'It\'s your first time logging in, you need to create a password!'}
        placeholder="Enter password"
        name="password"
        value={formData.password}
        onChange={onPasswordChange}
        type='password'
        error={error ? true : false}
      />
      <Button type='submit'>Login</Button>
    </Form>
    {error && <div className='ui error message'>
      {error}
    </div>}
    </div>
  </>
  )
}

export default LoginPassword;
