import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function RedirectRoute({children}) {

    const {isAuthenticated, userData} = useSelector(state => state.auth);

    if(isAuthenticated){
        return <Navigate to={`/student/${userData.branch}/1`} />;
    }

    return children;
}

export default RedirectRoute