import React from 'react'
import { Card } from 'semantic-ui-react';

const GroupCard = ({group}) => {
  return (
    <div style={{width: '100%',}}>
          <Card style={{width: '100%',}}>
            <Card.Content>
            <Card.Header>Group: {group.name}</Card.Header>
              <Card.Description>
              {`Classes learned: ${group.classes ? group.classes.map(cl => cl) : 'N/A'}`}
              <br />
              {`Teachers assigned: ${group.teachers ? group.teachers.map(teacher => teacher) : 'N/A'}`}
              <br />
              {`Students Assigned: ${group.students ? group.students.map(student => student) : 'N/A'}`}
              </Card.Description>
            </Card.Content>
          </Card>
    </div>
  )
}

export default GroupCard
