import React, { useContext } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { CurrentUserContext } from './context/user-context.js';

function checkRole(requiredRole, auth) {
	if (auth === undefined || auth === null)
		return false;
	//administrator can access to whole application
	if (auth.role === 'administrator')
		return true;
	//If user is a manager, he can access to manager-restricted and user-restricted areas
	if (requiredRole === 'manager')
		return auth.role === 'manager'
	// if simple user, check he's authenticated => has a token
	if (requiredRole === 'user' || requiredRole === undefined)
		return auth.token
	return false;
}

function ProtectedRoutes(props) {
	const { currentUser } = useContext(CurrentUserContext);
	let role = props.role;
	let isAuthorizedRole = checkRole(role, currentUser);
	return isAuthorizedRole ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoutes;