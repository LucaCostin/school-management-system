import React, { useState, useEffect } from 'react';
import { Button,  Icon, Modal, Form } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { createGroup } from '../redux/groupProvider';
import classesOptions from '../utility/classes';

const yearOptions = [
  {key: '1', value: '9', text: '9'},
  {key: '2', value: '10', text: '10'},
  {key: '3', value: '11', text: '11'},
  {key: '4', value: '12', text: '12'},
]

const identifierOptions = [
  {key: '1', value: 'A', text: 'A'},
  {key: '2', value: 'B', text: 'B'},
  {key: '3', value: 'C', text: 'C'},
  {key: '4', value: 'D', text: 'D'},
  {key: '5', value: 'E', text: 'E'},
]

const AddGroup = () => {
  const[formData, setFormData] = useState({ });

  const dispatch = useDispatch();

  const { error, groupsToShow } = useSelector((state) => ({ ...state.group }));

  const { year, identifier, classes } = formData;

  const[open, setOpen] = useState(false)

  const handleYearChange = (e, {value}) => {
    setFormData({...formData, year: value})
  }
  const handleIdentifierChange = (e, {value}) => {
    setFormData({...formData, identifier: value})
  }
  const handleClassesChange = (e, {value}) => {
    setFormData({...formData, classes: value})
  }

  const resetState = () => {
    setFormData({});
    setOpen(false)
  }

  const handleFinish = () => {
    dispatch(createGroup({formData, toast}));
    setFormData({});
  }

  useEffect(() => {
    !error && setOpen(false);
  }, [groupsToShow]);


  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size={'tiny'}
      trigger={<div style={{margin: 'auto', width:'fit-content'}}><Button size="large">Add a new Group</Button></div>}
    >
      <Modal.Header>Add a new Group</Modal.Header>
      <Modal.Content >
        <Form>
          <Form.Group>
            <Form.Dropdown
              label='Select Year'
              required={true}
              placeholder='Year'
              fluid
              name="year"
              selection
              value={year}
              options={yearOptions}
              onChange={handleYearChange}
              error={error ? true : false}
            />
            <Form.Dropdown
              label='Select Identifier'
              required={true}
              placeholder='Identifier'
              fluid
              name="identifier"
              selection
              value={identifier}
              options={identifierOptions}
              onChange={handleIdentifierChange}
              error={error ? true : false}
            />
          </Form.Group>
          <Form.Dropdown
              label='Assign classes to group'
              placeholder='Classes'
              name='classes'
              fluid
              selection
              multiple={true}
              search={true}
              value={classes}
              options={classesOptions}
              onChange={handleClassesChange}
              error={error ? true : false}
            />
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
          <Icon name='checkmark' /> Create
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default AddGroup;
