import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Transition } from 'semantic-ui-react';

import { getAllUsers } from '../redux/userProvider';
import GroupCard from './GroupCard';
import Spinner from './spinner/Spinner';

import { getGroups } from '../redux/groupProvider';

const GroupDashboard = () => {

  const dispatch = useDispatch();
  const { loading, groupsToShow } = useSelector((state) => ({ ...state.group }));

  const column_styles = {
    marginTop: 40,
    marginBottom: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '60%'
}

  useEffect(() => {
    dispatch(getGroups());
  },[])

  return (
    <>{loading? <Spinner /> :
      <Grid columns={1} >
        <Grid.Row>
             <Transition.Group duration={300}>
               {
                 groupsToShow && groupsToShow.map(group => (
                 <Grid.Column key={group._id} style={column_styles}>
                   <GroupCard group={group} style={{width:'100%'}}/>
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

export default GroupDashboard
