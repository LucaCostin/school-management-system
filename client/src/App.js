import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css';

import LoginEmail from './routes/LoginEmail';
import LoginPassword from './routes/LoginPassword';
import Home from './routes/Home';
import Students from './routes/Students';
import Admins from './routes/Admins';
import Teachers from './routes/Teachers';
import Groups from './routes/Groups';
import AdminRoute from './routes/AdminRoute';
import { setUser } from './redux/userProvider';

function App() {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    dispatch(setUser(user));
  },[])

  return (
    <BrowserRouter>
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<LoginEmail />} />
        <Route path='/login' element={<LoginPassword />} />
        <Route path='/home' element={<AdminRoute><Home /></AdminRoute>} />
        <Route path='/students' element={<AdminRoute><Students /></AdminRoute>} />
        <Route path='/teachers' element={<AdminRoute><Teachers /></AdminRoute>} />
        <Route path='/admins' element={<AdminRoute><Admins /></AdminRoute>} />
        <Route path='/groups' element={<AdminRoute><Groups /></AdminRoute>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
