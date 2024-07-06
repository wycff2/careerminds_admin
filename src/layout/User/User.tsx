import React, { useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { dashboardPagesMenu, demoPagesMenu } from '../../menu';
import { DropdownItem, DropdownMenu } from '../../components/bootstrap/Dropdown';
import Button from '../../components/bootstrap/Button';
import useDarkMode from '../../hooks/useDarkMode';
import Collapse from '../../components/bootstrap/Collapse';
import { NavigationLine } from '../Navigation/Navigation';
import Icon from '../../components/icon/Icon';
import useNavigationItemHandle from '../../hooks/useNavigationItemHandle';
import AuthContext from '../../contexts/authContext';
import USERS, { sam } from '../../common/data/userDummyData';
import Cookies from 'js-cookie';
import { getByIdUserSlice } from '../../pages/presentation/e-learning/services/slice/users';
import { useDispatch, useSelector } from 'react-redux';

const User = () => {
	const { userData, setUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleItem = useNavigationItemHandle();
	const { darkModeStatus, setDarkModeStatus } = useDarkMode();

	const [collapseStatus, setCollapseStatus] = useState<boolean>(false);
	const [userId, setUserId] = useState<string>('');

	const { t } = useTranslation(['translation', 'menu']);
	const { user } = useSelector((state: any) => state?.users);

	const handleLogout = useCallback(() => {
		localStorage.removeItem('t_A1b2C3d');
		Cookies.remove('u_xhs2Q9d');
	}, []);

	const fetchUserDetails = useCallback(
		(id: string) => {
			dispatch(getByIdUserSlice(id) as any);
		},
		[dispatch],
	);

	useEffect(() => {
		const userCookie = Cookies.get('u_xhs2Q9d');
		if (userCookie) {
			try {
				const u = JSON.parse(userCookie);
				setUserId(u._id);
				fetchUserDetails(u._id);
			} catch (error) {
				handleLogout();
			}
		} else {
			handleLogout();
		}
	}, [handleLogout, fetchUserDetails]);

	return (
		<>
			<div
				className={classNames('user', { open: collapseStatus })}
				role='presentation'
				onClick={() => setCollapseStatus(!collapseStatus)}>
				<div className='user-avatar'>
					<img src={sam?.src} alt='Avatar' width={128} height={128} />
				</div>
				<div className='user-info'>
					<div className='user-name d-flex align-items-center'>
						{user?.Name || null}
						<Icon icon='Verified' className='ms-1' color='info' />
					</div>
					<div className='user-sub-title'>
						{user?.role === 'admin' ? 'CEO, Founder' : '' || null}
					</div>
				</div>
			</div>
			<DropdownMenu>
				<DropdownItem>
					<Button icon='AccountBox' onClick={() => navigate(`/`)}>
						Profile
					</Button>
				</DropdownItem>
				<DropdownItem>
					<Button
						icon={darkModeStatus ? 'DarkMode' : 'LightMode'}
						onClick={() => setDarkModeStatus(!darkModeStatus)}
						aria-label='Toggle fullscreen'>
						{darkModeStatus ? 'Dark Mode' : 'Light Mode'}
					</Button>
				</DropdownItem>
			</DropdownMenu>

			<Collapse isOpen={collapseStatus} className='user-menu'>
				<nav aria-label='aside-bottom-user-menu'>
					<div className='navigation'>
						<div
							role='presentation'
							className='navigation-item cursor-pointer'
							onClick={() =>
								navigate(
									`/employee-page/${userId}`,
									// @ts-ignore
									handleItem(),
								)
							}>
							<span className='navigation-link navigation-link-pill'>
								<span className='navigation-link-info'>
									<Icon icon='AccountBox' className='navigation-icon' />
									<span className='navigation-text'>
										{t('menu:Profile') as ReactNode}
									</span>
								</span>
							</span>
						</div>
						<div
							role='presentation'
							className='navigation-item cursor-pointer'
							onClick={() => {
								setDarkModeStatus(!darkModeStatus);
								handleItem();
							}}>
							<span className='navigation-link navigation-link-pill'>
								<span className='navigation-link-info'>
									<Icon
										icon={darkModeStatus ? 'DarkMode' : 'LightMode'}
										color={darkModeStatus ? 'info' : 'warning'}
										className='navigation-icon'
									/>
									<span className='navigation-text'>
										{darkModeStatus
											? (t('menu:DarkMode') as ReactNode)
											: (t('menu:LightMode') as ReactNode)}
									</span>
								</span>
							</span>
						</div>
					</div>
				</nav>
				<NavigationLine />
				<nav aria-label='aside-bottom-user-menu-2'>
					<div className='navigation'>
						<div
							role='presentation'
							className='navigation-item cursor-pointer'
							onClick={() => {
								if (setUser) {
									setUser('');
								}
								navigate(`../${demoPagesMenu.login.path}`);
							}}>
							<span
								className='navigation-link navigation-link-pill'
								onClick={handleLogout}>
								<span className='navigation-link-info'>
									<Icon icon='Logout' className='navigation-icon' />
									<span className='navigation-text'>
										{t('menu:Logout') as ReactNode}
									</span>
								</span>
							</span>
						</div>
					</div>
				</nav>
			</Collapse>
		</>
	);
};

export default User;
