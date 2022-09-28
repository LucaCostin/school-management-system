import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';

import AddUser from '../components/AddUser';
import Menu from '../components/Menu';
import UsersDashboard from '../components/UsersDashboard';

const Students = () => {
  const props = {
    role: 'Student',
    action: 'Create'
  }
  return (
    <>
      <Menu/>
      <AddUser props={props} />
      <UsersDashboard props={'students'} />
    </>
  )
}

export default Students;
