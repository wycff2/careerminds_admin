import React, { useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../../components/bootstrap/Card';
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup';
import Checks, { ChecksGroup } from '../../../../../components/bootstrap/forms/Checks';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { BaseUrl } from '../../services/url';

interface Role {
	_id: string;
	name: string;
	admin_permissions: {
		[key: string]: {
			read: boolean;
			write: boolean;
			delete: boolean;
		};
	};
}

const RolePermission: React.FC = () => {
	const dispatch = useDispatch();
	const { roles, loading } = useSelector((state: any) => state.role);
	const [selectedRoleId, setSelectedRoleId] = useState<string>('');
	const [selectedRole, setSelectedRole] = useState<Role | null>(null);

	const filteredData = useMemo(() => {
		return roles?.filter((f: any) => {
			return f?.name !== 'superAdmin' && f?.name !== 'user';
		});
	}, [roles]);

	useEffect(() => {
		if (filteredData.length > 0) {
			setSelectedRoleId(filteredData[0]._id);
		}
	}, [filteredData]);

	useEffect(() => {
		if (selectedRoleId) {
			const foundRole = filteredData.find((role: any) => role._id === selectedRoleId);
			if (foundRole) {
				setSelectedRole(foundRole);
			}
		}
	}, [selectedRoleId, filteredData]);

	const togglePermission = async (
		permissionCategory: string,
		permissionType: keyof Role['admin_permissions'][string],
	) => {
		if (!selectedRole) return;

		const updatedPermissions = {
			...selectedRole.admin_permissions,
			[permissionCategory]: {
				...selectedRole.admin_permissions[permissionCategory],
				[permissionType]:
					!selectedRole.admin_permissions[permissionCategory][permissionType],
			},
		};

		try {
			await axios.put(`${BaseUrl}roles/update/${selectedRole._id}`, {
				admin_permissions: updatedPermissions,
			});
			console.log('Permissions updated successfully');
			setSelectedRole((prevRole) => ({
				...prevRole!,
				admin_permissions: updatedPermissions,
			}));
		} catch (error) {
			console.error('Error updating permissions', error);
		}
	};

	const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedRoleId(event.target.value);
	};

	return (
		<div className=''>
			<div className='row d-flex h-100'>
				<div className='col-xl-12'>
					<div className='display-5 fw-bold mb-4'>Role & Permission Assignments</div>
					<p className='fs-5 mb-5'>
						Please review the following role and permission assignments to ensure
						appropriate access is granted to each role.
					</p>
					<div className=''>
						<Card>
							<CardHeader>
								<CardLabel className='col-2' icon='Person'>
									<CardTitle>Select Role:</CardTitle>
								</CardLabel>
								<select
									className='form-select form-select-sm'
									value={selectedRoleId}
									onChange={handleRoleChange}>
									{filteredData.map((role: any) => (
										<option key={role._id} value={role._id}>
											{role.display_name}
										</option>
									))}
								</select>
							</CardHeader>
						</Card>
						{selectedRole && (
							<Card>
								<CardBody
									style={{
										maxHeight: 400,
										overflowY: 'auto',
										overflowX: 'hidden',
										scrollbarWidth: 'none',
										msOverflowStyle: 'none',
									}}>
									<div className='row'>
										<div className='col-12'>
											<div className='row g-4'>
												{Object.keys(selectedRole.admin_permissions).map(
													(category) => (
														<div key={category} className='col-3'>
															<Card className='position-sticky sticky-top-size'>
																<CardHeader>
																	<CardLabel>
																		<CardTitle>
																			{category}
																		</CardTitle>
																	</CardLabel>
																</CardHeader>
																<CardBody>
																	<FormGroup className='col-auto'>
																		<ChecksGroup>
																			{Object.keys(
																				selectedRole
																					.admin_permissions[
																					category
																				],
																			).map((permission) => (
																				<Checks
																					key={`${category}-${permission}`}
																					type='switch'
																					id={`${category}-${permission}`}
																					label={`${
																						permission
																							.charAt(
																								0,
																							)
																							.toUpperCase() +
																						permission.slice(
																							1,
																						)
																					}`}
																					checked={
																						selectedRole
																							.admin_permissions[
																							category
																						][
																							permission as keyof Role['admin_permissions'][string]
																						]
																					}
																					onChange={() =>
																						togglePermission(
																							category,
																							permission as keyof Role['admin_permissions'][string],
																						)
																					}
																				/>
																			))}
																		</ChecksGroup>
																	</FormGroup>
																</CardBody>
															</Card>
														</div>
													),
												)}
											</div>
										</div>
									</div>
								</CardBody>
							</Card>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RolePermission;

// import React, { useEffect, useMemo, useState } from 'react';
// import { useFormik } from 'formik';
// import Card, {
// 	CardBody,
// 	CardHeader,
// 	CardLabel,
// 	CardTitle,
// } from '../../../../../components/bootstrap/Card';
// import FormGroup from '../../../../../components/bootstrap/forms/FormGroup';
// import Checks, { ChecksGroup } from '../../../../../components/bootstrap/forms/Checks';
// import axios from 'axios';
// import { getAllfilteredDatalice } from '../../services/slice/accessControl';
// import { useDispatch, useSelector } from 'react-redux';

// interface Role {
// 	id: any;
// 	admin_permissions: {
// 		[key: string]: {
// 			read: boolean;
// 			write: boolean;
// 			delete: boolean;
// 		};
// 	};
// }

// const RolePermission: React.FC = () => {
// 	const dispatch = useDispatch();

// 	const { roles, loading } = useSelector((s: any) => s.role);
// 	console.log(roles)

// 	const [role, setRole] = useState<Role>({
// 		id: '',
// 		admin_permissions: {
// 			Dashboard: { read: false, write: false, delete: false },
// 			Management: { read: false, write: false, delete: false },
// 			Category: { read: false, write: false, delete: false },
// 			Module: { read: false, write: false, delete: false },
// 			Users: { read: false, write: false, delete: false },
// 			Enrollment: { read: false, write: false, delete: false },
// 			Participant: { read: false, write: false, delete: false },
// 			Feedback: { read: false, write: false, delete: false },
// 			AccessControl: { read: false, write: false, delete: false },
// 			AuditLogs: { read: false, write: false, delete: false },
// 		},
// 	});

// 	const togglePermission = async (
// 		permissionCategory: string,
// 		permissionType: keyof Role['admin_permissions'][string],
// 	) => {
// 		const updatedPermissions = {
// 			...role.admin_permissions,
// 			[permissionCategory]: {
// 				...role.admin_permissions[permissionCategory],
// 				[permissionType]: !role.admin_permissions[permissionCategory][permissionType],
// 			},
// 		};

// 		setRole((prevRole) => ({
// 			...prevRole,
// 			admin_permissions: updatedPermissions,
// 		}));

// 		try {
// 			await axios.put(`/api/roles/${role.id}`, {
// 				admin_permissions: updatedPermissions,
// 			});
// 			console.log('Permissions updated successfully');
// 		} catch (error) {
// 			console.error('Error updating permissions', error);
// 		}
// 	};

// 	const pageSize = useMemo(
// 		() => ({
// 			pageNo: 1,
// 			page: 10,
// 		}),
// 		[],
// 	);

// 	useEffect(() => {
// 		dispatch(getAllRoleSlice(pageSize) as any);
// 	}, [dispatch, pageSize]);

// 	return (
// 		<div className=''>
// 			<div className='row d-flex h-100'>
// 				<div className='col-xl-12'>
// 					<div className='display-5 fw-bold mb-4'>Role & Permission Assignments</div>
// 					<p className='fs-5 mb-5'>
// 						Lorem ipsum dolor sit amet consectetur adipisicing elit. Et asperiores iste
// 						voluptatibus neque voluptatem iusto nihil, nemo perspiciatis autem placeat
// 						saepe, deserunt quod maiores corrupti nostrum cum dolores? Optio, itaque?
// 					</p>
// 					<div className='col-md-6'>
// 						<Card>
// 							<CardHeader>
// 								<CardLabel icon='Person'>
// 									<CardTitle>Admin Access</CardTitle>
// 								</CardLabel>
// 							</CardHeader>
// 						</Card>
// 						<Card>
// 							<CardBody
// 								style={{
// 									maxHeight: 400,
// 									overflowY: 'auto',
// 									overflowX: 'hidden',
// 									scrollbarWidth: 'none',
// 									msOverflowStyle: 'none',
// 								}}>
// 								<div className='row'>
// 									<div className='col-12'>
// 										<div className='row g-4'>
// 											{Object.keys(role.admin_permissions).map((category) => (
// 												<div key={category} className='col-md-6'>
// 													<Card className='position-sticky sticky-top-size'>
// 														<CardHeader>
// 															<CardLabel>
// 																<CardTitle>{category}</CardTitle>
// 															</CardLabel>
// 														</CardHeader>
// 														<CardBody>
// 															<FormGroup className='col-auto'>
// 																<ChecksGroup>
// 																	{Object.keys(
// 																		role.admin_permissions[
// 																			category
// 																		],
// 																	).map((permission) => (
// 																		<Checks
// 																			key={`${category}-${permission}`}
// 																			type='switch'
// 																			id={`${category}-${permission}`}
// 																			label={`${
// 																				permission
// 																					.charAt(0)
// 																					.toUpperCase() +
// 																				permission.slice(1)
// 																			}`}
// 																			checked={
// 																				role
// 																					.admin_permissions[
// 																					category
// 																				][
// 																					permission as keyof Role['admin_permissions'][string]
// 																				]
// 																			}
// 																			onChange={() =>
// 																				togglePermission(
// 																					category,
// 																					permission as keyof Role['admin_permissions'][string],
// 																				)
// 																			}
// 																		/>
// 																	))}
// 																</ChecksGroup>
// 															</FormGroup>
// 														</CardBody>
// 													</Card>
// 												</div>
// 											))}
// 										</div>
// 									</div>
// 								</div>
// 							</CardBody>
// 						</Card>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default RolePermission;

// import React from 'react';

// import Card, {
// 	CardBody,
// 	CardHeader,
// 	CardLabel,
// 	CardTitle,
// } from '../../../../../components/bootstrap/Card';
// import FormGroup from '../../../../../components/bootstrap/forms/FormGroup';
// import Checks, { ChecksGroup } from '../../../../../components/bootstrap/forms/Checks';

// const RolePermision = () => {
// 	// const formik = useFormik({
// 	// 	initialValues: {
// 	// 		searchInput: '',
// 	// 		status: roles ? roles.map((s: any) => s.status) : [],
// 	// 		adminBelongsTo: '',
// 	// 		minPrice: '',
// 	// 		maxPrice: '',
// 	// 	},

// 	// 	// eslint-disable-next-line @typescript-eslint/no-unused-vars
// 	// 	onSubmit: (values) => {
// 	// 		// alert(JSON.stringify(values, null, 2));
// 	// 	},
// 	// });

// 	// const toggleStatus = (id: any) => {
// 	// 	const updatedStatus = formik.values.status.map((status, index) => {
// 	// 		if (roles[index].id === id) {
// 	// 			return !status;
// 	// 		}
// 	// 		return status;
// 	// 	});
// 	// 	formik.setFieldValue('status', updatedStatus);
// 	// 	showNotification(
// 	// 		<span className='d-flex align-items-center'>
// 	// 			<Icon icon='Info' size='md' className='me-1' />
// 	// 			<span>Updated Successfully</span>
// 	// 		</span>,
// 	// 		'role has been updated successfully',
// 	// 	);
// 	// };
// 	return (
// 		<div className=''>
// 			<div className='row d-flex h-100'>
// 				<div className='col-xl-12'>
// 					<div className='display-5 fw-bold mb-4'>Role & Permission Assignments</div>
// 					<p className='fs-5 mb-5'>
// 						Lorem ipsum dolor sit amet consectetur adipisicing elit. Et asperiores iste
// 						voluptatibus neque voluptatem iusto nihil, nemo perspiciatis autem placeat
// 						saepe, deserunt quod maiores corrupti nostrum cum dolores? Optio, itaque?
// 					</p>
// 					<div className='row g-4'>
// 						<div className='col-md-6'>
// 							<Card className='position-sticky sticky-top-size'>
// 								<CardBody>
// 									<Card>
// 										<CardHeader>
// 											<CardLabel icon='Person'>
// 												<CardTitle>Instructor Access</CardTitle>
// 											</CardLabel>
// 										</CardHeader>
// 										<CardBody>
// 											<span>
// 												Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, itaque!
// 											</span>
// 										</CardBody>
// 									</Card>
// 									<Card>
// 										<CardBody>
// 											<div className='row'>
// 												<div className='col-12'>
// 													<FormGroup>
// 														<ChecksGroup className=''>
// 															<Checks
// 																type='switch'
// 																id='inlineCheckOne'
// 																label='View Dashboard'
// 																name='checkOne'
// 																// onChange={formik.handleChange}
// 																// checked={formik.values.checkOne}
// 															/>
// 															<Checks
// 																type='switch'
// 																id='inlineCheckTwo'
// 																label='Manage Own Courses'
// 																name='checkTwo'
// 																// onChange={formik.handleChange}
// 																// checked={formik.values.checkTwo}
// 															/>
// 															<Checks
// 																type='switch'
// 																id='inlineCheckThree'
// 																label='View Own Course Reports'
// 																name='checkThree'
// 																// onChange={formik.handleChange}
// 																// checked={formik.values.checkThree}
// 															/>
// 															<Checks
// 																type='switch'
// 																id='inlineCheckThree'
// 																label='Manage Own Content'
// 																name='checkThree'
// 																// onChange={formik.handleChange}
// 																// checked={formik.values.checkThree}
// 															/>
// 															<Checks
// 																type='switch'
// 																id='inlineCheckThree'
// 																label='View Student Progress'
// 																name='checkThree'
// 																// onChange={formik.handleChange}
// 																// checked={formik.values.checkThree}
// 															/>
// 															<Checks
// 																type='switch'
// 																id='inlineCheckThree'
// 																label='Communicate with Students'
// 																name='checkThree'
// 																// onChange={formik.handleChange}
// 																// checked={formik.values.checkThree}
// 															/>
// 														</ChecksGroup>
// 													</FormGroup>
// 												</div>
// 											</div>
// 										</CardBody>
// 									</Card>
// 								</CardBody>
// 							</Card>
// 						</div>

// 						<div className='col-md-6'>
// 							<Card className='position-sticky sticky-top-size'>
// 								<CardBody>
// 									<Card>
// 										<CardHeader>
// 											<CardLabel icon='Person'>
// 												<CardTitle>Student Access</CardTitle>
// 											</CardLabel>
// 										</CardHeader>
// 										<CardBody>
// 											<span>
// 												Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, itaque!
// 											</span>
// 										</CardBody>
// 									</Card>
// 									<Card>
// 										<CardBody>
// 											<div className='row'>
// 												<div className='col-12'>
// 													<FormGroup>
// 														<ChecksGroup className=''>
// 															<Checks
// 																type='switch'
// 																id='inlineCheckOne'
// 																label='View Dashboard'
// 																name='checkOne'
// 																// onChange={formik.handleChange}
// 																// checked={formik.values.checkOne}
// 															/>
// 															<Checks
// 																type='switch'
// 																id='inlineCheckTwo'
// 																label='Access Enrolled Courses'
// 																name='checkTwo'
// 																// onChange={formik.handleChange}
// 																// checked={formik.values.checkTwo}
// 															/>
// 															<Checks
// 																type='switch'
// 																id='inlineCheckThree'
// 																label='Submit Assignments'
// 																name='checkThree'
// 																// onChange={formik.handleChange}
// 																// checked={formik.values.checkThree}
// 															/>
// 															<Checks
// 																type='switch'
// 																id='inlineCheckThree'
// 																label='Participate in Discussions'
// 																name='checkThree'
// 																// onChange={formik.handleChange}
// 																// checked={formik.values.checkThree}
// 															/>
// 															<Checks
// 																type='switch'
// 																id='inlineCheckThree'
// 																label='View Grades and Feedback'
// 																name='checkThree'
// 																// onChange={formik.handleChange}
// 																// checked={formik.values.checkThree}
// 															/>
// 														</ChecksGroup>
// 													</FormGroup>
// 												</div>
// 											</div>
// 										</CardBody>
// 									</Card>
// 								</CardBody>
// 							</Card>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default RolePermision;
