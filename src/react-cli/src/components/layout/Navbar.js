import React, { useContext } from 'react';
import { ScanHeart } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from '../../context/user-context.js';
import ActionButton from '../common/ActionButton.js';
import Api from '../../Api.js';


function Navbar() {
	const navigate = useNavigate();
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
	function login() { navigate('/login'); }

	/**
	 * call logout on server side.
	 * Clean current session into the context
	 */
	function logout() {
		Api.logout();
		setCurrentUser(null);
		navigate('/logout');
	}

	return (
		<nav className="bg-white">
			<div className="mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo and main nav */}
					<div className="flex items-center">
						<div className="flex-shrink-0">
							<ScanHeart className="h-8 w-8 text-secondary-500 mr-5" />
						</div>
						<div className="flex-shrink-0">
							<span className="text-primary-900 text-lg font-bold">Leozan Project</span>
						</div>
					</div>

					{/* Right side nav items */}
					<div className="hidden md:flex items-center space-x-4">
						{currentUser == null && <ActionButton name={"login"} text={"Log in"} onClick={() => login()} />}
						{currentUser && <div className=""><span className="text-white">{currentUser.username}</span>
							<div><ActionButton name={"logout"} text={"Log out"} onClick={logout} /></div>
						</div>
						}
					</div>
				</div>
			</div>
		</nav>
	);
}
export default Navbar;