import React, { useState } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import decode from 'jwt-decode';

import { logOut } from '../redux/userProvider';

const Nav = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate();

  const { user } = useSelector((state) => ({ ...state.user }));

  const token = user?.token;
	if(token){
		const decodedToken = decode(token);
		if(decodedToken.exp * 1000 < new Date().getTime()){
			dispatch(logOut());
		};
	};

  const pathname = window.location.pathname;

  const path = pathname === '/'? 'home' : pathname.substr(1);

  const [activeItem, setItem] = useState(path);

  const handleItemClick = (event, { name }) => {
    setItem( name );
		navigate(`/${name}`);
  };

    return (
      <Segment inverted>
        <Menu inverted secondary size="huge">
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='admins'
            active={activeItem === 'admins'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='teachers'
            active={activeItem === 'teachers'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='students'
            active={activeItem === 'students'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='groups'
            active={activeItem === 'groups'}
            onClick={handleItemClick}
          />
          <Menu.Menu position='right'>
                <Menu.Item
                name='logout'
                active={activeItem === 'logout'}
                onClick={()=>{
                  dispatch(logOut());
						      navigate('/');
                }}
                />
          </Menu.Menu>
        </Menu>
      </Segment>
    )
}

export default Nav;
