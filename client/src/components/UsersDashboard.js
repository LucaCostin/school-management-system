import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Transition } from 'semantic-ui-react';

import { getUsers } from '../redux/userProvider';
import UserCard from './UserCard';
import Spinner from './spinner/Spinner';

const UsersDashboard = (props) => {
  const role = props;

  const dispatch = useDispatch();
  const { usersToShow, loading } = useSelector((state) => ({ ...state.user }));


  useEffect(() => {
    dispatch(getUsers(role));
  },[])

  const column_styles = {
    marginTop: 40,
    marginBottom: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 'auto'
}

  return (
    <>{loading? <Spinner /> :
       <Grid columns={2} >
            <Grid.Row>
                <Transition.Group duration={300}>
                  {
                    usersToShow && usersToShow.map(user => (
                    <Grid.Column key={user._id} style={column_styles}>
                      <UserCard user={user} role={role.props}/>
                    </Grid.Column>
                ))
                    }
                </Transition.Group>
            </Grid.Row>
        </Grid>
      }
    </>
  )
}

export default UsersDashboard
