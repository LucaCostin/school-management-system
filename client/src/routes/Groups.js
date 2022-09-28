import React from 'react';

import Menu from '../components/Menu';
import AddGroup from '../components/AddGroup';
import GroupDashboard from '../components/GroupDashboard';


const Groups = () => {
  return (
    <div>
      <Menu />
      <AddGroup />
      <GroupDashboard />
    </div>
  )
}

export default Groups;
