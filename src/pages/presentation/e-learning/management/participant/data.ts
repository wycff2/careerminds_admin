const img1 =
	'https://t4.ftcdn.net/jpg/03/69/19/81/360_F_369198116_K0sFy2gRTo1lmIf5jVGeQmaIEibjC3NN.jpg';
const img2 =
	'https://t3.ftcdn.net/jpg/02/65/60/80/360_F_265608067_Nth2hs7Ri68NZBgHHhGuWIxaP6Z1m170.jpg';
const img3 =
	'https://t3.ftcdn.net/jpg/06/33/80/44/360_F_633804450_DWH5bj77LdDwlCSvMcqy6qVk4j9kchT3.jpg';
const img4 =
	'https://cewd.vtc.edu/wp-content/uploads/2022/02/GES3044_Web-Development-Bootcamp_Self-Paced-with-Coaching.jpg';
const img5 =
	'https://c8.alamy.com/comp/P9YRGJ/positive-web-developer-using-a-smartphone-while-working-with-holograms-P9YRGJ.jpg';

export const participants = [
	{
		id: 1,
		name: 'John Doe',
		thumb: img1,
		moduleBelongsTo: 'Introduction to Python',
		description:
			'Learn the basics of Python programming, including syntax, control flow, and data structures.',
		email: 'john@example.com',
		contactNumber: '123-456-7890',
		address: '123 Main Street, City, Country',
		createdAt: '2024-01-01',
		updatedAt: '2024-01-10',
		C: 'Active',
	},
	{
		id: 2,
		name: 'Emma Smith',
		thumb: img2,
		moduleBelongsTo: 'Web Development with HTML and CSS',
		description: 'An introduction to network security concepts, protocols, and best practices.',
		email: 'emma@example.com',
		contactNumber: '987-654-3210',
		address: '456 Elm Avenue, Town, Country',
		createdAt: '2024-02-01',
		updatedAt: '2024-02-10',
		status: 'Active',
	},
	{
		id: 3,
		name: 'Michael Johnson',
		thumb: img3,
		moduleBelongsTo: 'Web Development with HTML and CSS',
		description: 'Learn to create websites using HTML for structure and CSS for styling.',
		email: 'michael@example.com',
		contactNumber: '555-123-4567',
		address: '789 Oak Street, Village, Country',
		createdAt: '2024-03-01',
		updatedAt: '2024-03-10',
		status: 'Active',
	},
	{
		id: 4,
		name: 'Sarah Williams',
		thumb: img4,
		moduleBelongsTo: 'Advanced JavaScript Techniques',
		description:
			'Enhance your JavaScript skills with advanced concepts like closures, asynchronous programming, and ES6 features.',
		email: 'sarah@example.com',
		contactNumber: '111-222-3333',
		address: '101 Pine Road, Hamlet, Country',
		createdAt: '2024-04-01',
		updatedAt: '2024-04-10',
		status: 'Active',
	},
	{
		id: 5,
		name: 'Daniel Brown',
		thumb: img5,
		moduleBelongsTo: 'Web Development with HTML and CSS',
		description:
			'Learn SQL queries and techniques for analyzing and manipulating data in databases.',
		email: 'daniel@example.com',
		contactNumber: '444-555-6666',
		address: '202 Maple Lane, County, Country',
		createdAt: '2024-05-01',
		updatedAt: '2024-05-10',
		status: 'Active',
	},
	{
		id: 6,
		name: 'Olivia Wilson',
		thumb: img1,
		moduleBelongsTo: 'Ethical Hacking and Penetration Testing',
		description:
			'Understand the methodologies and tools used in ethical hacking and penetration testing.',
		email: 'olivia@example.com',
		contactNumber: '777-888-9999',
		address: '303 Cedar Street, Town, Country',
		createdAt: '2024-06-01',
		updatedAt: '2024-06-10',
		status: 'Active',
	},
	{
		id: 7,
		name: 'James Taylor',
		thumb: img2,
		moduleBelongsTo: 'Machine Learning with Python',
		description:
			'Learn to build machine learning models using Python libraries like scikit-learn and TensorFlow.',
		email: 'james@example.com',
		contactNumber: '123-987-6543',
		address: '505 Walnut Drive, City, Country',
		createdAt: '2024-07-01',
		updatedAt: '2024-07-10',
		status: 'Active',
	},
	{
		id: 8,
		name: 'Sophia Martinez',
		thumb: img3,
		moduleBelongsTo: 'Cloud Security Best Practices',
		description:
			'Explore the best practices for securing cloud environments and protecting cloud-based data.',
		email: 'sophia@example.com',
		contactNumber: '999-888-7777',
		address: '707 Elm Street, Village, Country',
		createdAt: '2024-08-01',
		updatedAt: '2024-08-10',
		status: 'Active',
	},
	{
		id: 9,
		name: 'William Anderson',
		thumb: img4,
		moduleBelongsTo: 'Cybersecurity Incident Response',
		description: 'Learn how to effectively respond to and manage cybersecurity incidents.',
		email: 'william@example.com',
		contactNumber: '987-654-3210',
		address: '909 Pine Avenue, Town, Country',
		createdAt: '2024-09-01',
		updatedAt: '2024-09-10',
		status: 'Active',
	},
	{
		id: 10,
		name: 'Isabella Thompson',
		thumb: img5,
		moduleBelongsTo: 'Data Visualization with Tableau',
		description:
			'Master the use of Tableau for creating interactive and insightful data visualizations.',
		email: 'isabella@example.com',
		contactNumber: '333-444-5555',
		address: '404 Oak Drive, City, Country',
		createdAt: '2024-10-01',
		updatedAt: '2024-10-10',
		status: 'Active',
	},
];
