import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Card } from 'semantic-ui-react'

import { checkEmail } from '../redux/userProvider';

const LoginEmail = () => {
  const [formData, setFormData] = useState({
		email:'',
	});

  const { loading, error } = useSelector((state) => ({ ...state.user }));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onEmailChange = (event) => {
    setFormData({
      ...formData, [event.target.name]: event.target.value
    });
  }

  const onFindEmail = () => {
    dispatch(checkEmail({ formData, navigate }));
  }

  const form_style = {
    margin: "auto",
		padding: "15px",
		maxWidth: "450px",
		alignContent: "center",
		paddingTop: "10%",
}

  return(
    <>
    <div style={form_style}>
    <h2>Log In To Tech College</h2>
    <br />
    <Form onSubmit={onFindEmail} noValidate className={loading ? "loading" : ''}>
      <Form.Input
        label="Email"
        placeholder="Enter email"
        name="email"
        value={formData.email}
        onChange={onEmailChange}
        type='email'
        error={error ? true : false}
      />
      <Button type='submit'>Continue</Button>
    </Form>
    {error && <div className='ui error message'>
      {error}
    </div>}
    </div>
  </>
  )
}

export default LoginEmail;
