import React from 'react';
import { Card, Button } from 'semantic-ui-react';

import DeleteButton from './DeleteButton';
import EditUser from './EditUser';

const UserCard = ({user: {_id, name, email,group, classes, gender}, role}) => {
  const userId = _id;
  const _user = {
    _id, name, email, group, classes, gender
  }

  let mockdata;
  role === 'students' && (mockdata = 'Student')
  role === 'teachers' && (mockdata = 'Teacher')
  role === 'admin' && (mockdata = 'Administrator')

  const _props = {
    role: mockdata,
    user: _user,
    userId: userId
  }

  return (
    <Card>
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <Card.Meta>{role === 'students' && 'Student' || role === 'teachers' && 'Teacher' || role === 'admins' && 'Administrator'}</Card.Meta>
      <Card.Description>
        {`Gender: ${gender? gender : 'N/A'}` }
        <br/>
        {role === 'students' && `Assigned to group: ${group? group.map(group => group): 'N/A'}`}
        {role === 'teachers' && `Assigned to groups: ${group? group.map(group => group): 'N/A'}`}
        <br />
        {role === 'teachers' && `Teaches: ${classes? classes.map(cl => cl): 'N/A'}`}
        <br/>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <div className='ui two buttons'>
        <EditUser props={_props}></EditUser>
        <DeleteButton userid={userId}></DeleteButton>
      </div>
    </Card.Content>
  </Card>
  )
}

export default UserCard;
