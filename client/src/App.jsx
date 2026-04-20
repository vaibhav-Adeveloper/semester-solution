import { useEffect } from 'react'
import './App.css'
import { Header, Footer } from './components/index';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkAuth } from './features/authSlice.js';

function App() {

  // const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  // const { branch, semester } = useSelector(state => state.auth.userData);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   { isAuthenticated && navigate(`/api/student/${branch}/${semester}`)}
  // }, []);

  const dispatch = useDispatch();
  // const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
     <Header/>
     <Outlet/>
     <Footer/>
    </>
  )
}

export default App
