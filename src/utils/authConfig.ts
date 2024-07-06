import Cookies from 'js-cookie';

const isAuthenticated = () => {
	const tokenLocal = localStorage.getItem('t_A1b2C3d');
	if (!tokenLocal) return false;
	const token = JSON.parse(tokenLocal);
	const userCookie = Cookies.get('u_xhs2Q9d');
	if (!userCookie) return false;
	const user = JSON.parse(userCookie);
	return token === user.token ? true : false;
};

export default isAuthenticated;
