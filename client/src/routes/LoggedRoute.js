import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoggedRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state.user }));
  const navigate = useNavigate();

  return !user ? children : navigate('/home');
}

export default LoggedRoute;
