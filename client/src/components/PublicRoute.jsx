import React, {useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { checkAuth } from '../features/authSlice';

function PublicRoute({children}) {
    const dispatch = useDispatch();
    const {isAuthenticated, userData} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(checkAuth());
      }, [isAuthenticated]);


    if(isAuthenticated){
        return <Navigate to={`/student/${userData.branch}/1`} />;
    }
    
    return children;
}

export default PublicRoute