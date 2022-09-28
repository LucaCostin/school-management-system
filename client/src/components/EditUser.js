import React, { useState, useEffect } from 'react';
import { Button, Icon, Modal, Form } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { editUser } from '../redux/userProvider';
import classesOptions from '../utility/classes';

const genderOptions = [
  {key: 'm', value: 'male', text: 'Male'},
  {key: 'f', value: 'female', text: 'Female'},
  {key: 'o', value: 'other', text: 'Other'},
]

const EditUser = ({ props: { role, user, userId} }) => {
  const[formData, setFormData] = useState({ });

  const dispatch = useDispatch();

  const { error, usersToShow } = useSelector((state) => ({ ...state.user }));
  const { groupsToShow } = useSelector((state) => ({ ...state.group }));

  const groupOptions = groupsToShow.map((group) => ({
    key: group._id, value: group.name, text: group.name
  }))

  const {email, name, gender, group, classes } = formData;

  useEffect(() => {
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

  useEffect(() => {
    setFormData({...user})
  },[])

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
    setOpen(false)
  }

  const handleFinish = () => {
    console.log(formData)
    console.log(user._id)
    dispatch(editUser({formData, userId, toast}));
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
      trigger={<div style={{margin: 'auto', width:'fit-content'}}><Button color="black" size="large">Edit</Button></div>}
    >
      <Modal.Header>Edit a {role}</Modal.Header>
      <Modal.Content >
        <Form>
          {/* <Form.Group> */}
            <Form.Input
              id='form-input-control-error-email'
              placeholder='Email'
              type='email'
              name='email'
              // value={email}
              defaultValue={email}
              onChange={handleChange}
              error={error ? true : false}
            />
            <Form.Input
              placeholder='Name'
              name='name'
              // value={name}
              defaultValue={name}
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
              defaultValue={gender}
              // value={gender}
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
              defaultValue={group}
              // value={group}
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
              defaultValue={group}
              multiple={true}
              search={true}
              // value={group}
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
              defaultValue={classes}
              multiple={true}
              search={true}
              // value={classes}
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
          <Icon name='checkmark' /> Confirm
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default EditUser;
