import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state.user }));
  const navigate = useNavigate();

  return user?.result?.isAdmin ? children : navigate('/');
}

export default AdminRoute;
