import React, { useState, useCallback, useEffect } from 'react';
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { createUser } from '../redux/userProvider';
import { getGroups } from '../redux/groupProvider';
import classesOptions from '../utility/classes';

const genderOptions = [
  {key: 'm', value: 'male', text: 'Male'},
  {key: 'f', value: 'female', text: 'Female'},
  {key: 'o', value: 'other', text: 'Other'},
]

const AddUser = ({ props: {role, action} }) => {
  const[formData, setFormData] = useState({ });

  const dispatch = useDispatch();

  const { error, usersToShow } = useSelector((state) => ({ ...state.user }));
  const { groupsToShow } = useSelector((state) => ({ ...state.group }));

  const groupOptions = groupsToShow.map((group) => ({
    key: group._id, value: group.name, text: group.name
  }))

  const {email, name, gender, group, classes } = formData;

  useEffect(() => {
    dispatch(getGroups());
    switch(role) {
      case 'Student':
        setFormData( {isStudent: true} );
        break;
      case 'Teacher':
        setFormData( {isTeacher: true} );
        break;
      case 'Admin':
        setFormData( {isAdmin: true} );
        break;
      }
  }, [])

  const[open, setOpen] = useState(false)

  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value})
  }
  const handleGenderChange = (e, {value}) => {
    setFormData({...formData, gender: value})
  }
  const handleGroupChange = (e, {value}) => {
    setFormData({...formData, group: value})
  }

  const handleClassesChange = (e, {value}) => {
    setFormData({...formData, classes: value})
  }

  const resetState = () => {
    setFormData({});
    setOpen(false)
  }

  const handleFinish = () => {
    dispatch(createUser({formData, toast}));
  }

  useEffect(() => {
    !error && setOpen(false);
  }, [usersToShow]);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size={'tiny'}
      trigger={<div style={{margin: 'auto', width:'fit-content'}}><Button size="large">{action} a {role}</Button></div>}
    >
      <Modal.Header>{action} a {role}</Modal.Header>
      <Modal.Content >
        <Form>
          {/* <Form.Group> */}
            <Form.Input
              id='form-input-control-error-email'
              placeholder='Email'
              type='email'
              name='email'
              value={email}
              onChange={handleChange}
              error={error ? true : false}
            />
            <Form.Input
              placeholder='Name'
              name='name'
              value={name}
              onChange={handleChange}
              error={error ? true : false}
            />
          {/* </Form.Group> */}
          {/* <Form.Group> */}
            <Form.Dropdown
              placeholder='Gender'
              fluid
              name="gender"
              selection
              value={gender}
              options={genderOptions}
              onChange={handleGenderChange}
              error={error ? true : false}
            />
            {role==='Student' &&
            <Form.Dropdown
              placeholder='Group'
              name='group'
              fluid
              selection
              value={group}
              options={groupOptions}
              onChange={handleGroupChange}
              error={error ? true : false}
            />}
            {role==='Teacher' &&
              <Form.Dropdown
              label='Assign Teacher to Groups'
              placeholder='Groups'
              name='group'
              fluid
              selection
              multiple={true}
              search={true}
              value={group}
              options={groupOptions}
              onChange={handleGroupChange}
              error={error ? true : false}
            />}
            {role==='Teacher' &&
              <Form.Dropdown
              label='What classes do they teach'
              placeholder='Classes'
              name='class'
              fluid
              selection
              multiple={true}
              search={true}
              value={classes}
              options={classesOptions}
              onChange={handleClassesChange}
              error={error ? true : false}
            />}
        </Form>
        {error && <div className='ui error message'>
      {error}
    </div>}
      </Modal.Content>
      <Modal.Actions>
      <Button color='grey' onClick={resetState}>
          <Icon name='remove' /> Cancel
        </Button>
        <Button color='black' onClick={handleFinish}>
          <Icon name='checkmark' /> {action}
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default AddUser;
