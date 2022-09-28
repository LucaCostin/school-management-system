import React from 'react';
import { useSelector } from 'react-redux';

import Menu from '../components/Menu';

const Home = () => {
  const { user } = useSelector((state) => ({ ...state.user }));

  return(
    <>
      <Menu />
      <h1>Hi {user?.result?.name} , Welcome to Tech College Website!</h1>
    </>
  )
}

export default Home;
